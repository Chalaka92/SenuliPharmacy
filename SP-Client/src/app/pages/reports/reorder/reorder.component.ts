import { DatePipe } from "@angular/common";
import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ItemBatch } from "@app/_models/itemBatch";
import { SpService } from "@app/_services/sp.service";
import { fadeInRightAnimation } from "src/@sp/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "src/@sp/animations/fade-in-up.animation";
import { ListColumn } from "src/@sp/shared/list/list-column.model";

@Component({
  selector: "sp-reorder",
  templateUrl: "./reorder.component.html",
  styleUrls: ["./reorder.component.scss"],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class ReorderComponent implements OnInit, OnDestroy {
  displayItemBatches: ItemBatch[];

  @Input()
  columns: ListColumn[] = [
    { name: "#Seq", property: "index", visible: true },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    {
      name: "Item Batch Code",
      property: "itemBatchCode",
      visible: true,
      isModelProperty: true,
    },
    { name: "Name", property: "name", visible: true, isModelProperty: true },
    {
      name: "Item",
      property: "itemName",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Status",
      property: "itemStatusName",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Stock Count",
      property: "stockCount",
      visible: true,
      isModelProperty: false,
      headerClass: "cellRightAlign",
      cellClass: "cellRightAlign",
    },
    {
      name: "Available Count",
      property: "itemCount",
      visible: true,
      isModelProperty: false,
      headerClass: "cellRightAlign",
      cellClass: "cellRightAlign",
    },
    {
      name: "Reorder Count",
      property: "reorderCount",
      visible: true,
      isModelProperty: false,
      headerClass: "cellRightAlign",
      cellClass: "cellRightAlign",
    },
    {
      name: "Max Retail Price",
      property: "maxRetailPrice",
      visible: false,
      isModelProperty: false,
      displayFn: " row[column.property] | number: '1.2-2'",
      headerClass: "cellRightAlign",
      cellClass: "cellRightAlign",
    },
    {
      name: "Manufacture Date",
      property: "manufactureDate",
      visible: false,
      isModelProperty: false,
      headerClass: "cellCenterAlign",
      cellClass: "cellCenterAlign",
    },
    {
      name: "Expiry Date",
      property: "expiryDate",
      visible: false,
      isModelProperty: false,
      headerClass: "cellCenterAlign",
      cellClass: "cellCenterAlign",
    },
  ] as ListColumn[];
  dataSource: MatTableDataSource<ItemBatch> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private spService: SpService) {}

  ngOnInit() {
    this.getAllItemBatches();
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

  getAllItemBatches() {
    this.spService._itemBatchService
      .getAllItemBatches()
      .subscribe((response) => {
        if (response) {
          response = response.filter((x) => x.reorderCount > 0);
          this.displayItemBatches = response;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.displayItemBatches;

          this.dataSource.sort = this.sort;
        }
      });
  }

  printReorderList() {
    let printHtml = document.getElementById("print-section").cloneNode(true);
    document.body.appendChild(printHtml);
    window.print();
    document.body.removeChild(printHtml);
  }

  getTotalReorderCount() {
    if (this.displayItemBatches)
      return this.displayItemBatches
        .map((t) => t.reorderCount)
        .reduce((acc, value) => acc + value, 0);
  }

  getTotalStockCount() {
    if (this.displayItemBatches)
      return this.displayItemBatches
        .map((t) => t.stockCount)
        .reduce((acc, value) => acc + value, 0);
  }

  getTotalAvailableCount() {
    if (this.displayItemBatches)
      return this.displayItemBatches
        .map((t) => t.itemCount)
        .reduce((acc, value) => acc + value, 0);
  }

  ngOnDestroy() {}
}
