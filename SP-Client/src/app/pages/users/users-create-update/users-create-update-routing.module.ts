import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@app/layout/layout.component';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { UsersCreateUpdateComponent } from './users-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: UsersCreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersCreateUpdateRoutingModule {}
