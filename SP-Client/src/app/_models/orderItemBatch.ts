import { ItemBatch } from "./itemBatch";

export class OrderItemBatch {
  id: number;
  orderId: number;
  itemBatchId: number;
  orderItemBatchCode: string;
  itemBatchCode: string;
  name: string;
  itemCount: number;
  itemPrice: number;
  shopOwnerDiscountRate: number;
  netPrice: number;
  totalNetPrice: number;
  orderedDate: Date;

  constructor(orderItemBatch) {
    this.id = orderItemBatch.id;
    this.orderId = orderItemBatch.orderId;
    this.itemBatchId = orderItemBatch.itemBatchId;
    this.orderItemBatchCode = orderItemBatch.orderItemBatchCode;
    this.name = orderItemBatch.name;
    this.itemCount = orderItemBatch.itemCount;
    this.itemPrice = orderItemBatch.itemPrice;
    this.shopOwnerDiscountRate = orderItemBatch.shopOwnerDiscountRate;
    this.netPrice = orderItemBatch.netPrice;
    this.totalNetPrice = orderItemBatch.totalNetPrice;
    this.orderedDate = orderItemBatch.orderedDate;
  }
}
