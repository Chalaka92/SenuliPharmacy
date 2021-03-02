import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Order } from "@app/_models/order";

@Component({
  selector: "sp-order-invoice",
  templateUrl: "./order-invoice.component.html",
  styleUrls: ["./order-invoice.component.scss"],
})
export class OrderInvoiceComponent implements OnInit {
  @Input("invoiceDetails") invoiceDetails: any;
  orderInvoiceDetails: Order;
  dataSource: MatTableDataSource<Order> | null;
  displayedColumns: string[] = [
    "index",
    "name",
    "netPrice",
    "itemCount",
    "totalNetPrice",
  ];
  mode: string;

  constructor(/*@Inject(MAT_DIALOG_DATA) public defaults: any*/) {
    // private dialogRef: MatDialogRef<OrderInvoiceComponent> // @Inject(MAT_DIALOG_DATA) public defaults: any,
    // this.orderInvoiceDetails = defaults.orderInvoiceDetails;
    // this.orderInvoiceDetails.totalDiscountAmount =
    //   this.orderInvoiceDetails.totalAmount -
    //   this.orderInvoiceDetails.totalNetAmount;
    // this.mode = defaults.mode;
  }

  ngOnInit() {
    if (this.invoiceDetails) {
      this.orderInvoiceDetails = this.invoiceDetails.orderInvoiceDetails;

      if (!this.invoiceDetails.orderInvoiceDetails)
        this.invoiceDetails.orderInvoiceDetails = {} as Order;

      this.orderInvoiceDetails.totalAmount = parseFloat(
        this.orderInvoiceDetails.totalAmount.toString().replace(",", "")
      );
      this.orderInvoiceDetails.totalNetAmount = parseFloat(
        this.orderInvoiceDetails.totalNetAmount.toString().replace(",", "")
      );

      this.orderInvoiceDetails.totalDiscountAmount =
        this.orderInvoiceDetails.totalAmount -
        this.orderInvoiceDetails.totalNetAmount;
      this.mode = this.invoiceDetails.mode;
      console.log(this.orderInvoiceDetails.totalAmount);
      console.log(this.orderInvoiceDetails.totalNetAmount);
      // if (!this.defaults.orderInvoiceDetails)
      //   this.defaults.orderInvoiceDetails = {} as Order;

      // this.dataSource = new MatTableDataSource();

      // this.dataSource.data = this.defaults.orderInvoiceDetails.orderItemBatches;

      this.dataSource = new MatTableDataSource();

      this.dataSource.data = this.invoiceDetails.orderInvoiceDetails.orderItemBatches;
    }
  }

  onPrint() {
    let printHtml = document.getElementById("print-section").cloneNode(true);
    document.body.appendChild(printHtml);
    window.print();
    document.body.removeChild(printHtml);
  }
}
