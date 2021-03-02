import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankRoutingModule } from './blank-routing.module';
import { BlankComponent } from './blank.component';
import { SpSharedModule } from '../../../@sp/sp-shared.module';

@NgModule({
  imports: [CommonModule, BlankRoutingModule, SpSharedModule],
  declarations: [BlankComponent],
})
export class BlankModule {}
