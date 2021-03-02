import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderCreateUpdateRoutingModule } from "./order-create-update-routing.module";
import { OrderCreateUpdateComponent } from "./order-create-update.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSelectModule } from "@angular/material/select";
import { SpSharedModule } from "src/@sp/sp-shared.module";
import { SPCardModule } from "src/@sp/shared/card/card.module";
import { MaterialModule } from "src/@sp/shared/material-components.module";
import { NgxPrintModule } from "ngx-print";
import { OrderInvoiceComponent } from "../order-invoice/order-invoice.component";
import { CurrencyFormatterModule } from "@app/common/currency-formatter/currency-formatter.module";

@NgModule({
  declarations: [OrderCreateUpdateComponent, OrderInvoiceComponent],
  imports: [
    CommonModule,
    OrderCreateUpdateRoutingModule,
    SpSharedModule,
    SPCardModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MaterialModule,
    NgxPrintModule,
    CurrencyFormatterModule,
  ],
})
export class OrderCreateUpdateModule {}
