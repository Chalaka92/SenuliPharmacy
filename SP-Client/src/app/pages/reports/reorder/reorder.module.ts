import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReorderComponent } from "./reorder.component";
import { SpSharedModule } from "src/@sp/sp-shared.module";
import { ListModule } from "src/@sp/shared/list/list.module";
import { MaterialModule } from "src/@sp/shared/material-components.module";
import { ReorderRoutingModule } from "./reorder-routing.module";
import { NgxPrintModule } from "ngx-print";

@NgModule({
  imports: [
    CommonModule,
    SpSharedModule,
    ListModule,
    MaterialModule,
    ReorderRoutingModule,
    NgxPrintModule,
  ],
  declarations: [ReorderComponent],
})
export class ReorderModule {}
