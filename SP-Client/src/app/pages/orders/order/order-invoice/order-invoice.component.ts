import { Component, Input, OnInit } from "@angular/core";
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

  constructor() {}

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

      this.dataSource = new MatTableDataSource();

      this.dataSource.data = this.invoiceDetails.orderInvoiceDetails.orderItemBatches;
    }
  }

  onPrint() {
    setTimeout(function () {
      let printHtml = document.getElementById("print-section").cloneNode(true);
      document.body.appendChild(printHtml);
      window.print();
      document.body.removeChild(printHtml);
    }, 500);
  }
}
