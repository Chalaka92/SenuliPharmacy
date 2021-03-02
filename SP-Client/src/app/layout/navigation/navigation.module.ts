import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { SpSharedModule } from '../../../@sp/sp-shared.module';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';

@NgModule({
  imports: [CommonModule, SpSharedModule],
  declarations: [NavigationComponent, NavigationItemComponent],
  exports: [NavigationComponent],
})
export class NavigationModule {}
