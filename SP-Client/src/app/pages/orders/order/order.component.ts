import { DatePipe } from "@angular/common";
import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmDialogComponent } from "@app/common/confirm-dialog/confirm-dialog.component";
import { Order } from "@app/_models/order";
import { AuthService } from "@app/_services/auth.service";
import { SpService } from "@app/_services/sp.service";
import { fadeInRightAnimation } from "src/@sp/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@sp/animations/fade-in-up.animation";
import { ListColumn } from "src/@sp/shared/list/list-column.model";

@Component({
  selector: "sp-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: Order[];
  selectedShopId: any | 0;
  displayOrders: Order[];

  @Input()
  columns: ListColumn[] = [
    { name: "#Seq", property: "index", visible: true },
    {
      name: "Id",
      property: "id",
      visible: false,
      isModelProperty: true,
      isList: false,
    },
    {
      name: "Order Code",
      property: "orderCode",
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: "Cashier",
      property: "salesRepName",
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: "Total Amount (Rs.)",
      property: "totalAmount",
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: "Discount (%)",
      property: "totalBillDiscount",
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: "Net Amount (Rs.)",
      property: "totalNetAmount",
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: "Ordered Date",
      property: "orderedDate",
      visible: true,
      isModelProperty: true,
      isList: false,
      headerClass: "headerCenterAlign",
      cellClass: "cellCenterAlign",
    },
    {
      name: "IsComplete",
      property: "isComplete",
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: "IsEdit",
      property: "isEdit",
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: "Edited By",
      property: "editedUserName",
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: "IsCancel",
      property: "isCancel",
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: "Cancel By",
      property: "canceledUserName",
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<Order> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private spService: SpService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getAllOrders();
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getAllOrders() {
    this.spService._orderService.getAllOrders().subscribe((response) => {
      if (response) {
        response.forEach((x) => {
          x.orderedDate = this.datePipe.transform(x.orderedDate, "MMM d, y");
        });
        this.orders = response;
        this.displayOrders = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.displayOrders;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  deleteOrder(order: { id: number }) {
    this.spService._orderService.deleteOrder(order.id).subscribe(
      () => {
        this.getAllOrders();
        this.snackbar.open("Deletion Successful", "x", {
          duration: 3000,
          panelClass: "notif-success",
        });
      },
      () => {
        this.snackbar.open("Deletion Failed", "x", {
          duration: 3000,
          panelClass: "notif-error",
        });
      }
    );
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  confirmDialog(order: any): void {
    const message = `Are you sure you want to delete this?`;

    const dialogData = {
      icon: "delete",
      title: "Delete",
      message: message,
      icolor: "warn",
    };

    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.deleteOrder(order);
        }
      });
  }

  completeOrder(order: any): void {
    const message = `Are you sure you want to complete this?`;

    const dialogData = {
      icon: "check",
      title: "Complete",
      message: message,
      icolor: "accent",
    };

    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          order.isComplete = true;
          order.completedDate = new Date();
          order.loginEmail = this.authService.currentUserValue.email;
          this.spService._orderService.completeOrder(order.id, order).subscribe(
            () => {
              this.getAllOrders();
              this.snackbar.open("Completion Successful", "x", {
                duration: 3000,
                panelClass: "notif-success",
              });
            },
            () => {
              this.snackbar.open("Completion Failed", "x", {
                duration: 3000,
                panelClass: "notif-error",
              });
            }
          );
        }
      });
  }

  cancelOrder(order: any): void {
    const message = `Are you sure you want to complete this?`;

    const dialogData = {
      icon: "cancel",
      title: "Cancel",
      message: message,
      icolor: "default",
    };

    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          order.isCancel = true;
          order.canceledDate = new Date();
          order.canceledReason = "";
          order.loginEmail = this.authService.currentUserValue.email;
          this.spService._orderService.cancelOrder(order.id, order).subscribe(
            () => {
              this.getAllOrders();
              this.snackbar.open("Cancellation Successful", "x", {
                duration: 3000,
                panelClass: "notif-success",
              });
            },
            () => {
              this.snackbar.open("Cancellation Failed", "x", {
                duration: 3000,
                panelClass: "notif-error",
              });
            }
          );
        }
      });
  }

  ngOnDestroy() {}
}
