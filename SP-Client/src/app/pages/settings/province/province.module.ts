import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';
import { MaterialModule } from 'src/@sp/shared/material-components.module';
import { SpSharedModule } from 'src/@sp/sp-shared.module';
import { ListModule } from 'src/@sp/shared/list/list.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@sp/shared/breadcrumbs/breadcrumbs.module';
import { ProvinceCreateUpdateModule } from './province-create-update/province-create-update.module';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [ProvinceComponent],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    MaterialModule,
    SpSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ProvinceCreateUpdateModule,
    ConfirmDialogModule,
  ],
})
export class ProvinceModule {}
