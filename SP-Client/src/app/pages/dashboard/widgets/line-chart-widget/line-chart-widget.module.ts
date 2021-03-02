import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingOverlayModule } from '../../../../../@sp/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sp/shared/material-components.module';
import { LineChartWidgetComponent } from './line-chart-widget.component';
import { SPCardModule } from '../../../../../@sp/shared/card/card.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,

    // Chart Widget Style
    SPCardModule,
    ChartsModule,
  ],
  declarations: [LineChartWidgetComponent],
  exports: [LineChartWidgetComponent],
})
export class LineChartWidgetModule {}
