import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersCreateUpdateComponent } from "./users-create-update.component";
import { SpSharedModule } from "src/@sp/sp-shared.module";
import { SPCardModule } from "src/@sp/shared/card/card.module";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersCreateUpdateRoutingModule } from "./users-create-update-routing.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@NgModule({
  imports: [
    CommonModule,
    SpSharedModule,
    SPCardModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    UsersCreateUpdateRoutingModule,
    MatGridListModule,
    MatAutocompleteModule,
  ],
  declarations: [UsersCreateUpdateComponent],
})
export class UsersCreateUpdateModule {}
