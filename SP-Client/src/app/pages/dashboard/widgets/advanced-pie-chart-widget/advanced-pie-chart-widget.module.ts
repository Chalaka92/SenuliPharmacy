import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SPCardModule } from '../../../../../@sp/shared/card/card.module';
import { LoadingOverlayModule } from '../../../../../@sp/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sp/shared/material-components.module';
import { ScrollbarModule } from '../../../../../@sp/shared/scrollbar/scrollbar.module';
import { AdvancedPieChartWidgetComponent } from './advanced-pie-chart-widget.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    SPCardModule,
    LoadingOverlayModule,
    ScrollbarModule,
    ChartsModule,
  ],
  declarations: [AdvancedPieChartWidgetComponent],
  exports: [AdvancedPieChartWidgetComponent],
})
export class AdvancedPieChartWidgetModule {}
