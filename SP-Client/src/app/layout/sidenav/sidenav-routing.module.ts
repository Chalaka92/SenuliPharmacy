import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { LayoutComponent } from '../layout.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidenavRoutingModule {}
