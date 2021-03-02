import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Item } from "@app/_models/item";
import { ItemBatch } from "@app/_models/itemBatch";
import { Status } from "@app/_models/status";
import { SpService } from "@app/_services/sp.service";
import { ItemCreateUpdateComponent } from "../../item/item-create-update/item-create-update.component";

@Component({
  selector: "sp-item-batch-create-update",
  templateUrl: "./item-batch-create-update.component.html",
  styleUrls: ["./item-batch-create-update.component.scss"],
})
export class ItemBatchCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: "create" | "update" = "create";
  items: Item[];
  statuses: Status[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ItemCreateUpdateComponent>,
    private fb: FormBuilder,
    private spService: SpService
  ) {
    this.items = defaults.items;
  }

  ngOnInit(): void {
    this.getAllStatuses();
    if (this.defaults.itemBatch) {
      this.mode = "update";
    } else {
      this.defaults.itemBatch = {} as ItemBatch;
    }

    this.form = this.fb.group({
      name: [this.defaults.itemBatch.name || ""],
      itemId: [this.defaults.itemBatch.itemId || null],
      itemStatusId: [this.defaults.itemBatch.itemStatusId || null],
      itemCount: [this.defaults.itemBatch.itemCount || 0],
      stockCount: [this.defaults.itemBatch.stockCount || 0],
      reorderCount: [this.defaults.itemBatch.reorderCount || 0],
      itemBatchCode: [this.defaults.itemBatch.itemBatchCode || null],
      maxRetailPrice: [this.defaults.itemBatch.maxRetailPrice || 0],
      manufactureDate: [this.defaults.itemBatch.manufactureDate || null],
      expiryDate: [this.defaults.itemBatch.expiryDate || null],
    });
  }

  getAllStatuses() {
    this.spService._statusService.getAllStatuses().subscribe((response) => {
      if (response) {
        this.statuses = response;
      }
    });
  }

  save() {
    if (this.mode === "create") {
      this.createItem();
    } else if (this.mode === "update") {
      this.updateItem();
    }
  }

  createItem() {
    const itemBatch = this.form.value;
    this.dialogRef.close(itemBatch);
  }

  updateItem() {
    const itemBatch = this.form.value;
    itemBatch.id = this.defaults.itemBatch.id;

    this.dialogRef.close(itemBatch);
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

  setAllItemCount(stockCount: any, availCount: any) {
    if (this.isCreateMode()) {
      this.form.patchValue({
        itemCount: stockCount,
        reorderCount: 0,
      });
    } else {
      this.form.patchValue({
        itemCount: availCount ? availCount : stockCount,
        reorderCount: stockCount - availCount < 0 ? 0 : stockCount - availCount,
      });
    }
  }
}
