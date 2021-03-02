import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderCreateUpdateComponent } from './order-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: OrderCreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderCreateUpdateRoutingModule {}
