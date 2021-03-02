import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ItemBatch } from "@app/_models/itemBatch";
import { Order } from "@app/_models/order";
import { OrderItemBatch } from "@app/_models/orderItemBatch";
import { SpService } from "@app/_services/sp.service";

@Component({
  selector: "sp-order-item-batch-create-update",
  templateUrl: "./order-item-batch-create-update.component.html",
  styleUrls: ["./order-item-batch-create-update.component.scss"],
})
export class OrderItemBatchCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: "create" | "update" = "create";
  orders: Order[];
  itemBatches: ItemBatch[];
  selectedItemBatch: ItemBatch;
  selectedOrder: Order;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<OrderItemBatchCreateUpdateComponent>,
    private fb: FormBuilder,
    private spService: SpService
  ) {
    this.orders = defaults.orders;
    this.itemBatches = defaults.itemBatches;
  }

  ngOnInit(): void {
    if (this.defaults.orderItemBatch) {
      this.mode = "update";
      this.setSelectedOrder(this.defaults.orderItemBatch.orderId);
    } else {
      this.defaults.orderItemBatch = {} as OrderItemBatch;
    }

    this.form = this.fb.group({
      orderId: [this.defaults.orderItemBatch.orderId || null],
      itemBatchId: [this.defaults.orderItemBatch.itemBatchId || null],
      itemCount: [this.defaults.orderItemBatch.itemCount || null],
      orderItemBatchCode: [
        this.defaults.orderItemBatch.orderItemBatchCode || null,
      ],
      name: [this.defaults.orderItemBatch.name || null],
      itemPrice: [this.defaults.orderItemBatch.itemPrice || null],
      netPrice: [this.defaults.orderItemBatch.netPrice || null],
      totalNetPrice: [this.defaults.orderItemBatch.totalNetPrice || null],
      shopOwnerDiscountRate: [
        this.defaults.orderItemBatch.shopOwnerDiscountRate || null,
      ],
    });
  }

  getAllItemBatches() {
    this.spService._itemBatchService
      .getAllItemBatches()
      .subscribe((response) => {
        if (response) {
          this.itemBatches = response;
        }
      });
  }

  save() {
    if (this.mode === "create") {
      this.createOrderItemBatch();
    } else if (this.mode === "update") {
      this.updateOrderItemBatch();
    }
  }

  createOrderItemBatch() {
    const orderItemBatch = this.form.value;
    this.dialogRef.close(orderItemBatch);
  }

  updateOrderItemBatch() {
    const orderItemBatch = this.form.value;
    orderItemBatch.id = this.defaults.orderItemBatch.id;

    this.dialogRef.close(orderItemBatch);
  }

  setSelectedOrder(orderId: any) {
    this.selectedOrder = this.orders.filter((x) => x.id === orderId)[0];

    this.getAllItemBatches();
  }

  setSelectedItemBatch(itemBatchId: any) {
    this.selectedItemBatch = this.itemBatches.filter(
      (x) => x.id === itemBatchId
    )[0];

    this.form.patchValue({
      name: this.selectedItemBatch.name,
      itemCount: 1,
      itemPrice: this.selectedItemBatch.maxRetailPrice,
      netPrice: this.calculateDiscountedPrice(
        this.form.value.shopOwnerDiscountRate,
        this.selectedItemBatch.maxRetailPrice
      ),
      totalNetPrice:
        this.calculateDiscountedPrice(
          this.form.value.shopOwnerDiscountRate,
          this.selectedItemBatch.maxRetailPrice
        ) * 1,
    });
  }

  calculatedNetItemPrice(discount: number, amount: number) {
    this.form.patchValue({
      netPrice: this.calculateDiscountedPrice(discount, amount),
      totalNetPrice:
        this.calculateDiscountedPrice(discount, amount) *
        this.form.value.itemCount,
    });
  }

  calculateDiscountedPrice(discount: number, amount: number) {
    let netPrice = 0;
    discount = discount ? discount : 0;
    amount = amount ? amount : 0;
    netPrice = amount * (1 - discount / 100);

    return netPrice;
  }

  setTotalNetPrice(netPrice: number, count: number) {
    this.form.patchValue({
      totalNetPrice: netPrice * count,
    });
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}
