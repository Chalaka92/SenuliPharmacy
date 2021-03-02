import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { District } from '@app/_models/district';
import { Province } from '@app/_models/province';

@Component({
  selector: 'sp-district-create-update',
  templateUrl: './district-create-update.component.html',
  styleUrls: ['./district-create-update.component.scss'],
})
export class DistrictCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  provinces: Province[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<DistrictCreateUpdateComponent>,
    private fb: FormBuilder
  ) {
    this.provinces = defaults.provinces;
  }

  ngOnInit(): void {
    if (this.defaults.district) {
      this.mode = 'update';
    } else {
      this.defaults.district = {} as District;
    }

    this.form = this.fb.group({
      name: [this.defaults.district.name || ''],
      provinceId: [this.defaults.district.provinceId || null],
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createDistrict();
    } else if (this.mode === 'update') {
      this.updateDistrict();
    }
  }

  createDistrict() {
    const district = this.form.value;
    this.dialogRef.close(district);
  }

  updateDistrict() {
    const district = this.form.value;
    district.id = this.defaults.district.id;

    this.dialogRef.close(district);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
