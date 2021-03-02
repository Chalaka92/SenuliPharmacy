import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { ConfirmDialogComponent } from "@app/common/confirm-dialog/confirm-dialog.component";
import { ItemBatch } from "@app/_models/itemBatch";
import { Order } from "@app/_models/order";
import { OrderItemBatch } from "@app/_models/orderItemBatch";
import { AuthService } from "@app/_services/auth.service";
import { SpService } from "@app/_services/sp.service";
import { fadeInRightAnimation } from "src/@sp/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@sp/animations/fade-in-up.animation";
import { ListColumn } from "src/@sp/shared/list/list-column.model";
import { OrderInvoiceComponent } from "../order-invoice/order-invoice.component";

@Component({
  selector: "sp-order-create-update",
  templateUrl: "./order-create-update.component.html",
  styleUrls: ["./order-create-update.component.scss"],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class OrderCreateUpdateComponent implements OnInit {
  form: FormGroup;
  printData: any;
  mode: "create" | "update" = "create";
  defaults: Order;
  orderId: number;
  itemBatches: ItemBatch[];
  selectedItemBatch: ItemBatch;
  orderItemBatch: OrderItemBatch;
  orderItemBatches: OrderItemBatch[];
  isSubmitClick: boolean = false;

  private _gap = 16;
  gap = `${this._gap}px`;

  @Input()
  columns: ListColumn[] = [
    {
      name: "Name",
      property: "name",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Item Count",
      property: "itemCount",
      visible: true,
      isModelProperty: true,
      cellClass: "cellRightAlign",
      headerClass: "cellRightAlign",
    },
    {
      name: "Item Price (Rs.)",
      property: "itemPrice",
      visible: true,
      isModelProperty: false,
      cellClass: "cellRightAlign",
      headerClass: "cellRightAlign",
      displayFn: "number: '1.2-2'",
    },
    {
      name: "Discount (%)",
      property: "shopOwnerDiscountRate",
      visible: true,
      isModelProperty: false,
      cellClass: "cellRightAlign",
      headerClass: "cellRightAlign",
    },
    {
      name: "Net Price (Rs.)",
      property: "netPrice",
      visible: true,
      isModelProperty: false,
      cellClass: "cellRightAlign",
      headerClass: "cellRightAlign",
    },
    {
      name: "Total Net Price (Rs.)",
      property: "totalNetPrice",
      visible: true,
      isModelProperty: false,
      cellClass: "cellRightAlign",
      headerClass: "cellRightAlign",
    },
    {
      name: "Actions",
      property: "actions",
      visible: true,
      cellClass: "",
      headerClass: "",
    },
  ] as ListColumn[];
  dataSource: MatTableDataSource<OrderItemBatch> | null;

  constructor(
    private fb: FormBuilder,
    private spService: SpService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.orderId = params["orderId"];
      if (this.orderId) {
        this.getSingleOrder(this.orderId);
        this.mode = "update";
      } else {
        this.defaults = {} as Order;
        this.buildForm();
        this.orderItemBatches = [];
      }
    });

    this.spService._itemBatchService
      .getAllItemBatches()
      .subscribe((response) => {
        this.itemBatches = response;
      });
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  buildForm() {
    this.orderItemBatch = {} as OrderItemBatch;
    const orderItemFormGroup = this.fb.group({
      itemBatchId: this.fb.control(this.orderItemBatch.itemBatchId || 0),
      name: this.fb.control(this.orderItemBatch.name),
      itemCount: this.fb.control(this.orderItemBatch.itemCount || 0),
      itemPrice: this.fb.control(this.orderItemBatch.itemPrice || 0),
      shopOwnerDiscountRate: this.fb.control(
        this.orderItemBatch.shopOwnerDiscountRate || 0
      ),
      netPrice: this.fb.control(this.orderItemBatch.netPrice || 0),
      itemBatchCode: this.fb.control(this.orderItemBatch.itemBatchCode),
    });

    this.form = this.fb.group({
      orderCode: [this.defaults.orderCode || null],
      totalAmount: [this.defaults.totalAmount || 0.0],
      totalBillDiscount: [this.defaults.totalBillDiscount || 0.0],
      totalNetAmount: [this.defaults.totalNetAmount || 0.0],
      totalDiscountAmount: [this.defaults.totalDiscountAmount || 0.0],
      orderItemBatch: orderItemFormGroup,
    });
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${
      this._gap - this._gap / colAmount
    }px)`;
  }

  save() {
    if (this.mode === "create") {
      this.createOrder();
    } else if (this.mode === "update") {
      this.updateOrder();
    }
  }

  createOrder() {
    const order: Order = this.form.value;
    order.orderedDate = new Date();
    order.completedDate = new Date();
    order.isComplete = true;
    order.loginEmail = this.authService.currentUserValue.email;
    order.orderItemBatches = this.orderItemBatches;

    if (order) {
      this.spService._orderService.createOrder(order).subscribe(
        (response: any) => {
          this.snackbar.open("Order Creation Successful.", "x", {
            duration: 3000,
            panelClass: "notif-success",
          });
          order.orderCode = response;
          this.printOrderInvoice(order);
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
          this.snackbar.open("Order Creation Failed.", "x", {
            duration: 3000,
            panelClass: "notif-error",
          });
        }
      );
    }
  }

  updateOrder() {
    const order: Order = this.form.value;
    order.id = this.orderId;
    order.isEdit = true;
    order.editedDate = new Date();
    order.loginEmail = this.authService.currentUserValue.email;
    order.orderItemBatches = this.orderItemBatches;

    if (order) {
      this.spService._orderService.updateOrder(order.id, order).subscribe(
        () => {
          this.snackbar.open("Update Successful.", "x", {
            duration: 3000,
            panelClass: "notif-success",
          });
          this.printOrderInvoice(order);
        },
        () => {
          this.snackbar.open("Update Failed.", "x", {
            duration: 3000,
            panelClass: "notif-error",
          });
        }
      );
    }
  }

  getSingleOrder(orderId: number) {
    this.spService._orderService
      .getSingleOrder(orderId)
      .subscribe((response) => {
        if (response) {
          this.defaults = response;
          this.defaults.totalDiscountAmount =
            response.totalAmount - response.totalNetAmount;

          this.orderItemBatches = response.orderItemBatches;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.orderItemBatches;
          this.buildForm();
        }
      });
  }

  AddOrderItemBatch(orderItemBatch: any) {
    if (
      this.orderItemBatches.filter(
        (x) => x.itemBatchId === orderItemBatch.itemBatchId
      ).length > 0
    ) {
      this.snackbar.open("Item batch already exist.", "x", {
        duration: 3000,
        panelClass: "notif-error",
      });
    } else {
      orderItemBatch.totalNetPrice =
        orderItemBatch.itemCount * orderItemBatch.netPrice;
      this.orderItemBatches.push(orderItemBatch);
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.orderItemBatches;

      let totalAmount = 0;
      this.orderItemBatches.forEach((x) => {
        totalAmount += x.netPrice * x.itemCount;
      });

      this.form.patchValue({
        totalAmount: totalAmount,
        totalNetAmount: this.calculateDiscountedPrice(
          this.form.value.totalBillDiscount,
          totalAmount
        ),
        orderItemBatch: {
          itemBatchId: 0,
          name: "",
          itemCount: 0,
          itemPrice: 0,
          shopOwnerDiscountRate: 0,
          netPrice: 0,
          itemBatchCode: "",
        },
      });
    }
  }

  removeOrderItemBatch(rowIndex: any, row: any) {
    this.orderItemBatches.splice(rowIndex, 1);
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.orderItemBatches;

    let totalAmount = 0;
    this.orderItemBatches.forEach((x) => {
      totalAmount += x.netPrice * x.itemCount;
    });

    this.form.patchValue({
      totalAmount: totalAmount,
      totalNetAmount: this.calculateDiscountedPrice(
        this.form.value.totalBillDiscount,
        totalAmount
      ),
    });
  }

  setSelectedItemBatch(itemBatchId: any) {
    this.selectedItemBatch = this.itemBatches.filter(
      (x) => x.id === itemBatchId
    )[0];

    this.form.patchValue({
      orderItemBatch: {
        name: this.selectedItemBatch.name,
        itemPrice: this.selectedItemBatch.maxRetailPrice,
        netPrice: this.calculateDiscountedPrice(
          this.form.value.orderItemBatch.shopOwnerDiscountRate,
          this.selectedItemBatch.maxRetailPrice
        ),
        itemBatchCode: this.selectedItemBatch.itemBatchCode,
        itemCount: 1,
      },
    });
  }

  calculatedNetItemPrice(discount: number, amount: number) {
    this.form.patchValue({
      orderItemBatch: {
        netPrice: this.calculateDiscountedPrice(discount, amount),
      },
    });
  }

  calculatedTotalNetAmountPrice(discount: number, amount: number) {
    this.form.patchValue({
      totalNetAmount: this.calculateDiscountedPrice(discount, amount),
      totalDiscountAmount:
        amount - this.calculateDiscountedPrice(discount, amount),
    });
  }

  calculateDiscountedPrice(discount: number, amount: number) {
    let netPrice = 0;
    discount = discount ? discount : 0;
    amount = amount ? amount : 0;
    netPrice = amount * (1 - discount / 100);

    return netPrice;
  }

  confirmSaveDialog(): void {
    const message = `Are you sure you want to proceed this order?`;

    const dialogData = {
      icon: "delete",
      title: "Order Invoice",
      message: message,
      icolor: "success",
    };

    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          if (this.isUpdateMode()) {
            this.updateOrder();
          } else {
            this.createOrder();
          }
        }
      });
  }

  removeValidator(form: any) {
    // tslint:disable-next-line: forin
    for (const field in form.controls) {
      // 'field' is a string
      const con = form.get(field);
      // 'control' is a FormControl
      con.clearValidators();
      con.updateValueAndValidity();
    }
  }

  printOrderInvoice(invoice: any) {
    // const dialogData = { orderInvoiceDetails: invoice, mode: this.mode };
    this.printData = { orderInvoiceDetails: invoice, mode: this.mode };
    this.isSubmitClick = true;

    setTimeout(function () {
      let printHtml = document.getElementById("print-section").cloneNode(true);
      document.body.appendChild(printHtml);
      window.print();
      document.body.removeChild(printHtml);
      // var divContents = document
      //   .getElementById("print-section")
      //   .cloneNode(true);
      // var a = window.open("", "", "height=500, width=500");
      // a.document.write("<html>");
      // a.document.write("<body>");
      // a.document.body.appendChild(divContents);
      // a.document.write("</body></html>");
      // a.document.close();
      // a.print();
    }, 0);

    // this.dialog
    //   .open(OrderInvoiceComponent, {
    //     data: dialogData,
    //     width: "40%",
    //   })
    //   .afterClosed()
    //   .subscribe((dialogResult) => {
    //     if (dialogResult) {
    //       if (this.isUpdateMode()) {
    //         this.updateOrder();
    //       } else {
    //         this.createOrder();
    //       }
    //     }
    //   });
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}
