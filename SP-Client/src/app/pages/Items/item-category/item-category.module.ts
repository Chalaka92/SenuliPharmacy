import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemCategoryRoutingModule } from './item-category-routing.module';
import { ItemCategoryComponent } from './item-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SpSharedModule } from 'src/@sp/sp-shared.module';
import { BreadcrumbsModule } from 'src/@sp/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sp/shared/list/list.module';
import { MaterialModule } from 'src/@sp/shared/material-components.module';
import { ItemCategoryCreateUpdateModule } from './item-category-create-update/item-category-create-update.module';

@NgModule({
  declarations: [ItemCategoryComponent],
  imports: [
    CommonModule,
    ItemCategoryRoutingModule,
    MaterialModule,
    SpSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ConfirmDialogModule,
    ItemCategoryCreateUpdateModule,
  ],
})
export class ItemCategoryModule {}
