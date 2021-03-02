import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusTypeRoutingModule } from './status-type-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SpSharedModule } from 'src/@sp/sp-shared.module';
import { BreadcrumbsModule } from 'src/@sp/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sp/shared/list/list.module';
import { MaterialModule } from 'src/@sp/shared/material-components.module';
import { StatusTypeCreateUpdateModule } from './status-type-create-update/status-type-create-update.module';
import { StatusTypeComponent } from './status-type.component';

@NgModule({
  declarations: [StatusTypeComponent],
  imports: [
    CommonModule,
    StatusTypeRoutingModule,
    MaterialModule,
    SpSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    StatusTypeCreateUpdateModule,
    ConfirmDialogModule,
  ],
})
export class StatusTypeModule {}
