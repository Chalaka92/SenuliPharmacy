import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { OrderComponent } from "./order.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogModule } from "@app/common/confirm-dialog/confirm-dialog.module";
import { SpSharedModule } from "src/@sp/sp-shared.module";
import { BreadcrumbsModule } from "src/@sp/shared/breadcrumbs/breadcrumbs.module";
import { ListModule } from "src/@sp/shared/list/list.module";
import { MaterialModule } from "src/@sp/shared/material-components.module";
import { OrderCreateUpdateModule } from "./order-create-update/order-create-update.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MaterialModule,
    SpSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ConfirmDialogModule,
    OrderCreateUpdateModule,
    FormsModule,
    MatGridListModule,
  ],
  providers: [DatePipe],
})
export class OrderModule {}
