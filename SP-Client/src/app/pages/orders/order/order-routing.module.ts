import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'createUpdateOrder',
        loadChildren: () =>
          import('./order-create-update/order-create-update.module').then(
            (m) => m.OrderCreateUpdateModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'createUpdateOrder/:orderId',
        loadChildren: () =>
          import('./order-create-update/order-create-update.module').then(
            (m) => m.OrderCreateUpdateModule
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
export class OrderRoutingModule {}
