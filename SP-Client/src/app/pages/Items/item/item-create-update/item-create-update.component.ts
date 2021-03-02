import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from '@app/_models/item';
import { ItemCategory } from '@app/_models/itemCategory';

@Component({
  selector: 'sp-item-create-update',
  templateUrl: './item-create-update.component.html',
  styleUrls: ['./item-create-update.component.scss'],
})
export class ItemCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  itemCategories: ItemCategory[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ItemCreateUpdateComponent>,
    private fb: FormBuilder
  ) {
    this.itemCategories = defaults.itemCategories;
  }

  ngOnInit(): void {
    if (this.defaults.item) {
      this.mode = 'update';
    } else {
      this.defaults.item = {} as Item;
    }

    this.form = this.fb.group({
      name: [this.defaults.item.name || ''],
      itemCode: [this.defaults.item.itemCode || null],
      comment: [this.defaults.item.comment || null],
      categoryId: [this.defaults.item.categoryId || null],
      categoryName: [this.defaults.item.categoryName || null],
      isNew: [this.defaults.item.isNew || false],
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createItem();
    } else if (this.mode === 'update') {
      this.updateItem();
    }
  }

  createItem() {
    const item = this.form.value;
    this.dialogRef.close(item);
  }

  updateItem() {
    const item = this.form.value;
    item.id = this.defaults.item.id;

    this.dialogRef.close(item);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
