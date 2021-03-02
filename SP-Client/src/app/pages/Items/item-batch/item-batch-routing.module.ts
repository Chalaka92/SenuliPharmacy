import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemBatchComponent } from './item-batch.component';

const routes: Routes = [
  {
    path: '',
    component: ItemBatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemBatchRoutingModule {}
