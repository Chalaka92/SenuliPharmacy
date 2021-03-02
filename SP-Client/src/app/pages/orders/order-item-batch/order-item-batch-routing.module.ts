import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderItemBatchComponent } from './order-item-batch.component';

const routes: Routes = [
  {
    path: '',
    component: OrderItemBatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderItemBatchRoutingModule {}
