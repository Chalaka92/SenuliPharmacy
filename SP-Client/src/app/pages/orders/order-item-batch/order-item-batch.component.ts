import { Input, OnDestroy, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmDialogComponent } from "@app/common/confirm-dialog/confirm-dialog.component";
import { ItemBatch } from "@app/_models/itemBatch";
import { Order } from "@app/_models/order";
import { OrderItemBatch } from "@app/_models/orderItemBatch";
import { SpService } from "@app/_services/sp.service";
import { fadeInRightAnimation } from "src/@sp/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@sp/animations/fade-in-up.animation";
import { ListColumn } from "src/@sp/shared/list/list-column.model";
import { OrderItemBatchCreateUpdateComponent } from "./order-item-batch-create-update/order-item-batch-create-update.component";

@Component({
  selector: "sp-order-item-batch",
  templateUrl: "./order-item-batch.component.html",
  styleUrls: ["./order-item-batch.component.scss"],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class OrderItemBatchComponent implements OnInit, OnDestroy {
  orderItemBatches: OrderItemBatch[];
  orders: Order[];
  itemBatches: ItemBatch[];
  displayOrderItemBatches: OrderItemBatch[];
  selectedOrderId: any | 0;

  @Input()
  columns: ListColumn[] = [
    { name: "#Seq", property: "index", visible: true },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    {
      name: "Name",
      property: "name",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Code",
      property: "orderItemBatchCode",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Item Count",
      property: "itemCount",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Item Price",
      property: "itemPrice",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Discount (%)",
      property: "shopOwnerDiscountRate",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Net Price",
      property: "netPrice",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Total Net Price",
      property: "totalNetPrice",
      visible: true,
      isModelProperty: true,
    },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<OrderItemBatch> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private spService: SpService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllOrderItemBatches();
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

  getAllOrderItemBatches() {
    this.spService._orderItemBatchService
      .getAllOrderItemBatches()
      .subscribe((response) => {
        if (response) {
          this.orderItemBatches = response;
          this.displayOrderItemBatches = response;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.displayOrderItemBatches;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  getAllOrders() {
    this.spService._orderService.getAllOrders().subscribe((response) => {
      if (response) {
        this.orders = response;
      }
    });
  }

  createOrderItemBatch() {
    const dialogData = { orders: this.orders };
    this.dialog
      .open(OrderItemBatchCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe(
        (orderItemBatch: OrderItemBatch) => {
          if (orderItemBatch) {
            if (
              this.orderItemBatches.filter(
                (x) =>
                  x.itemBatchId === orderItemBatch.itemBatchId &&
                  x.orderId === orderItemBatch.orderId
              ).length > 0
            ) {
              this.snackbar.open("Record already exist.", "x", {
                duration: 3000,
                panelClass: "notif-error",
              });
            } else {
              if (orderItemBatch) {
                this.spService._orderItemBatchService
                  .createOrderItemBatch(orderItemBatch)
                  .subscribe((response) => {
                    this.getAllOrderItemBatches();
                    this.snackbar.open("Creation Successful", "x", {
                      duration: 3000,
                      panelClass: "notif-success",
                    });
                  });
                this.orderItemBatches.unshift(
                  new OrderItemBatch(orderItemBatch)
                );
              }
            }
          }
        },
        (error) => {
          this.snackbar.open("Creation Failed", "x", {
            duration: 3000,
            panelClass: "notif-error",
          });
        }
      );
  }

  updateOrderItemBatch(orderItemBatch) {
    const dialogData = {
      orders: this.orders,
      orderItemBatch: orderItemBatch,
    };
    this.dialog
      .open(OrderItemBatchCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(
        (orderItemBatch) => {
          /**
           * Item is the updated item (if the user pressed Save - otherwise it's null)
           */
          if (orderItemBatch) {
            this.spService._orderItemBatchService
              .updateOrderItemBatch(orderItemBatch.id, orderItemBatch)
              .subscribe((response) => {
                this.getAllOrderItemBatches();
                this.snackbar.open("Update Successful", "x", {
                  duration: 3000,
                  panelClass: "notif-success",
                });
              });
          }
        },
        (error) => {
          this.snackbar.open("Update Failed", "x", {
            duration: 3000,
            panelClass: "notif-error",
          });
        }
      );
  }

  deleteOrderItemBatch(orderItemBatch) {
    this.spService._orderItemBatchService
      .deleteOrderItemBatch(orderItemBatch.id)
      .subscribe((response) => {
        this.getAllOrderItemBatches();
        this.snackbar.open("Deletion Successful", "x", {
          duration: 3000,
          panelClass: "notif-success",
        });
      });
  }

  filterByOrderId() {
    if (this.selectedOrderId > 0) {
      this.displayOrderItemBatches = this.orderItemBatches.filter(
        (x) => x.orderId === this.selectedOrderId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayOrderItemBatches;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displayOrderItemBatches = this.orderItemBatches;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayOrderItemBatches;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  confirmDialog(orderItemBatch): void {
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
          this.deleteOrderItemBatch(orderItemBatch);
        }
      });
  }

  ngOnDestroy() {}
}
