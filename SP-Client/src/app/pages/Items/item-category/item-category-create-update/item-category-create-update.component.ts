import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemCategory } from '@app/_models/itemCategory';

@Component({
  selector: 'sp-item-category-create-update',
  templateUrl: './item-category-create-update.component.html',
  styleUrls: ['./item-category-create-update.component.scss'],
})
export class ItemCategoryCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ItemCategoryCreateUpdateComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as ItemCategory;
    }

    this.form = this.fb.group({
      name: [this.defaults.name || null],
      itemCategoryCode: [this.defaults.itemCategoryCode || null],
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createItemCategory();
    } else if (this.mode === 'update') {
      this.updateItemCategory();
    }
  }

  createItemCategory() {
    const itemCategory = this.form.value;
    this.dialogRef.close(itemCategory);
  }

  updateItemCategory() {
    const itemCategory = this.form.value;
    itemCategory.id = this.defaults.id;

    this.dialogRef.close(itemCategory);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
