import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusTypeComponent } from './status-type.component';

const routes: Routes = [
  {
    path: '',
    component: StatusTypeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusTypeRoutingModule {}
