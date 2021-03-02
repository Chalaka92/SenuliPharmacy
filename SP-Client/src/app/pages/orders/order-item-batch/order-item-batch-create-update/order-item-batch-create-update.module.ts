import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderItemBatchCreateUpdateComponent } from "./order-item-batch-create-update.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CurrencyFormatterModule } from "@app/common/currency-formatter/currency-formatter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    CurrencyFormatterModule,
  ],
  declarations: [OrderItemBatchCreateUpdateComponent],
  entryComponents: [OrderItemBatchCreateUpdateComponent],
  exports: [OrderItemBatchCreateUpdateComponent],
})
export class OrderItemBatchCreateUpdateModule {}
