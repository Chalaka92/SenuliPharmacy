import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SPCardModule } from '../../../../../@sp/shared/card/card.module';
import { MaterialModule } from '../../../../../@sp/shared/material-components.module';
import { RealtimeUsersWidgetComponent } from './realtime-users-widget.component';
import { ScrollbarModule } from '../../../../../@sp/shared/scrollbar/scrollbar.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    SPCardModule,
    ScrollbarModule,
  ],
  declarations: [RealtimeUsersWidgetComponent],
  exports: [RealtimeUsersWidgetComponent],
})
export class RealtimeUsersWidgetModule {}
