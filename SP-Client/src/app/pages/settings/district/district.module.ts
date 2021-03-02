import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictRoutingModule } from './district-routing.module';
import { DistrictComponent } from './district.component';
import { MaterialModule } from 'src/@sp/shared/material-components.module';
import { SpSharedModule } from 'src/@sp/sp-shared.module';
import { ListModule } from 'src/@sp/shared/list/list.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@sp/shared/breadcrumbs/breadcrumbs.module';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { DistrictCreateUpdateModule } from './district-create-update/district-create-update.module';

@NgModule({
  declarations: [DistrictComponent],
  imports: [
    CommonModule,
    DistrictRoutingModule,
    MaterialModule,
    SpSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    DistrictCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
})
export class DistrictModule {}
