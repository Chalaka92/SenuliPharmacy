import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SpSharedModule } from 'src/@sp/sp-shared.module';
import { BreadcrumbsModule } from 'src/@sp/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sp/shared/list/list.module';
import { MaterialModule } from 'src/@sp/shared/material-components.module';
import { ItemCreateUpdateModule } from './item-create-update/item-create-update.module';

@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    MaterialModule,
    SpSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ItemCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
})
export class ItemModule {}
