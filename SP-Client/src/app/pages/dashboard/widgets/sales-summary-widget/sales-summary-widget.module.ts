import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SPCardModule } from '../../../../../@sp/shared/card/card.module';
import { LoadingOverlayModule } from '../../../../../@sp/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sp/shared/material-components.module';
import { SalesSummaryWidgetComponent } from './sales-summary-widget.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    SPCardModule,
    ChartsModule,
  ],
  declarations: [SalesSummaryWidgetComponent],
  exports: [SalesSummaryWidgetComponent],
})
export class SalesSummaryWidgetModule {}
