import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Province } from '@app/_models/province';

@Component({
  selector: 'sp-province-create-update',
  templateUrl: './province-create-update.component.html',
  styleUrls: ['./province-create-update.component.scss'],
})
export class ProvinceCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ProvinceCreateUpdateComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Province;
    }

    this.form = this.fb.group({
      name: [this.defaults.name || ''],
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createProvince();
    } else if (this.mode === 'update') {
      this.updateProvince();
    }
  }

  createProvince() {
    const province = this.form.value;
    this.dialogRef.close(province);
  }

  updateProvince() {
    const province = this.form.value;
    province.id = this.defaults.id;

    this.dialogRef.close(province);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
