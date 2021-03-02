import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ItemBatchRoutingModule } from "./item-batch-routing.module";
import { ItemBatchComponent } from "./item-batch.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ConfirmDialogModule } from "@app/common/confirm-dialog/confirm-dialog.module";
import { SpSharedModule } from "src/@sp/sp-shared.module";
import { BreadcrumbsModule } from "src/@sp/shared/breadcrumbs/breadcrumbs.module";
import { ListModule } from "src/@sp/shared/list/list.module";
import { MaterialModule } from "src/@sp/shared/material-components.module";
import { ItemBatchCreateUpdateModule } from "./item-batch-create-update/item-batch-create-update.module";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [ItemBatchComponent],
  imports: [
    CommonModule,
    ItemBatchRoutingModule,
    MaterialModule,
    SpSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ItemBatchCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class ItemBatchModule {}
