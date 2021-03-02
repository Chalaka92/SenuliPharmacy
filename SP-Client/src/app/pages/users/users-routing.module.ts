import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@app/layout/layout.component';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'createUpdateUser',
        loadChildren: () =>
          import('./users-create-update/users-create-update.module').then(
            (m) => m.UsersCreateUpdateModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'createUpdateUser/:userId',
        loadChildren: () =>
          import('./users-create-update/users-create-update.module').then(
            (m) => m.UsersCreateUpdateModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
