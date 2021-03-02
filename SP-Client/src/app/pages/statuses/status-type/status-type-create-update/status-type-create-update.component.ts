import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatusType } from '@app/_models/statusType';

@Component({
  selector: 'sp-status-type-create-update',
  templateUrl: './status-type-create-update.component.html',
  styleUrls: ['./status-type-create-update.component.scss'],
})
export class StatusTypeCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<StatusTypeCreateUpdateComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as StatusType;
    }

    this.form = this.fb.group({
      name: [this.defaults.name || ''],
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createStatusType();
    } else if (this.mode === 'update') {
      this.updateStatusType();
    }
  }

  createStatusType() {
    const statusType = this.form.value;
    this.dialogRef.close(statusType);
  }

  updateStatusType() {
    const statusType = this.form.value;
    statusType.id = this.defaults.id;

    this.dialogRef.close(statusType);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
