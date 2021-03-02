import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Status } from '@app/_models/status';
import { StatusType } from '@app/_models/statusType';

@Component({
  selector: 'sp-status-create-update',
  templateUrl: './status-create-update.component.html',
  styleUrls: ['./status-create-update.component.scss'],
})
export class StatusCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  statusTypes: StatusType[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<StatusCreateUpdateComponent>,
    private fb: FormBuilder
  ) {
    this.statusTypes = defaults.statusTypes;
  }

  ngOnInit(): void {
    if (this.defaults.status) {
      this.mode = 'update';
    } else {
      this.defaults.status = {} as Status;
    }

    this.form = this.fb.group({
      name: [this.defaults.status.name || ''],
      statusTypeId: [this.defaults.status.statusTypeId || null],
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createStatus();
    } else if (this.mode === 'update') {
      this.updateStatus();
    }
  }

  createStatus() {
    const status = this.form.value;
    this.dialogRef.close(status);
  }

  updateStatus() {
    const status = this.form.value;
    status.id = this.defaults.status.id;

    this.dialogRef.close(status);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
