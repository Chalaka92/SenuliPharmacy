import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../@sp/shared/material-components.module';
import { ScrollbarModule } from '../../../@sp/shared/scrollbar/scrollbar.module';
import { QuickpanelComponent } from './quickpanel.component';

@NgModule({
  imports: [CommonModule, MaterialModule, ScrollbarModule],
  declarations: [QuickpanelComponent],
  exports: [QuickpanelComponent],
})
export class QuickpanelModule {}
