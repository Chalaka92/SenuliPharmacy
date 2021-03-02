import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { StatusComponent } from './status.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SpSharedModule } from 'src/@sp/sp-shared.module';
import { BreadcrumbsModule } from 'src/@sp/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sp/shared/list/list.module';
import { MaterialModule } from 'src/@sp/shared/material-components.module';
import { StatusCreateUpdateModule } from './status-create-update/status-create-update.module';

@NgModule({
  declarations: [StatusComponent],
  imports: [
    CommonModule,
    StatusRoutingModule,
    MaterialModule,
    SpSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    StatusCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
})
export class StatusModule {}
