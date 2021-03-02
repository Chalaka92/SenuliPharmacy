import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../@sp/shared/material-components.module';
import { ScrollbarModule } from '../../../@sp/shared/scrollbar/scrollbar.module';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { SidenavComponent } from './sidenav.component';
import { SidenavService } from './sidenav.service';
import { SidenavRoutingModule } from './sidenav-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ScrollbarModule,
    SidenavRoutingModule,
  ],
  declarations: [SidenavComponent, SidenavItemComponent],
  exports: [SidenavComponent],
  providers: [SidenavService],
})
export class SidenavModule {}
