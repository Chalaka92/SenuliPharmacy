import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/@sp/shared/material-components.module';
import { SpSharedModule } from 'src/@sp/sp-shared.module';
import { ListModule } from 'src/@sp/shared/list/list.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@sp/shared/breadcrumbs/breadcrumbs.module';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { UsersCreateUpdateModule } from './users-create-update/users-create-update.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    SpSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ConfirmDialogModule,
    UsersCreateUpdateModule,
  ],
  providers: [DatePipe],
})
export class UsersModule {}
