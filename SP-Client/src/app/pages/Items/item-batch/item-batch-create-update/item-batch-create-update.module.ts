import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemBatchCreateUpdateComponent } from "./item-batch-create-update.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
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
    MatDatepickerModule,
    CurrencyFormatterModule,
  ],
  declarations: [ItemBatchCreateUpdateComponent],
  entryComponents: [ItemBatchCreateUpdateComponent],
  exports: [ItemBatchCreateUpdateComponent],
  providers: [],
})
export class ItemBatchCreateUpdateModule {}
