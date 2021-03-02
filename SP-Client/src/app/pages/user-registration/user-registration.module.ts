import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRegistrationRoutingModule } from './user-registration-routing.module';
import { MaterialModule } from 'src/@sp/shared/material-components.module';
import { SpSharedModule } from 'src/@sp/sp-shared.module';
import { ListModule } from 'src/@sp/shared/list/list.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@sp/shared/breadcrumbs/breadcrumbs.module';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { UserRegistrationComponent } from './user-registration.component';

@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [
    CommonModule,
    UserRegistrationRoutingModule,
    MaterialModule,
    SpSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ConfirmDialogModule,
  ],
})
export class UserRegistrationModule {}
