import { OrderItemBatch } from "./orderItemBatch";

export class Order {
  id: number;
  salesRepName: string;
  orderCode: string;
  totalAmount: number;
  totalBillDiscount: number;
  totalDiscountAmount: number;
  totalNetAmount: number;
  isComplete: boolean;
  completedDate: Date;
  orderedDate: any;
  isEdit: boolean;
  editedDate: Date;
  editedUserId: number;
  editedUserName: string;
  isCancel: boolean;
  canceledDate: Date;
  canceledUserId: number;
  canceledUserName: string;
  canceledReason: string;
  loginEmail: string;
  orderItemBatches: OrderItemBatch[];

  constructor(order) {
    this.id = order.id;
    this.salesRepName = order.salesRepName;
    this.orderCode = order.orderCode;
    this.totalAmount = order.totalAmount;
    this.totalBillDiscount = order.totalBillDiscount;
    this.totalDiscountAmount = order.totalDiscountAmount;
    this.totalNetAmount = order.totalNetAmount;
    this.isComplete = order.isComplete;
    this.completedDate = order.completedDate;
    this.orderedDate = order.orderedDate;
    this.isEdit = order.isEdit;
    this.editedDate = order.editedDate;
    this.editedUserId = order.editedUserId;
    this.isCancel = order.isCancel;
    this.canceledDate = order.canceledDate;
    this.canceledUserId = order.canceledUserId;
    this.canceledReason = order.canceledReason;
    this.orderItemBatches = order.orderItemBatches;
    this.editedUserName = order.editedUserName;
    this.canceledUserName = order.canceledUserName;
  }
}
