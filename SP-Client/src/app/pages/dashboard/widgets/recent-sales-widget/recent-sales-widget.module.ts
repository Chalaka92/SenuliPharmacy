import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SPCardModule } from '../../../../../@sp/shared/card/card.module';
import { ListModule } from '../../../../../@sp/shared/list/list.module';
import { LoadingOverlayModule } from '../../../../../@sp/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sp/shared/material-components.module';
import { RecentSalesWidgetTableComponent } from './recent-sales-widget-table/recent-sales-widget-table.component';
import { RecentSalesWidgetComponent } from './recent-sales-widget.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    SPCardModule,
    ListModule,
    ChartsModule,
  ],
  declarations: [RecentSalesWidgetComponent, RecentSalesWidgetTableComponent],
  exports: [RecentSalesWidgetComponent],
})
export class RecentSalesWidgetModule {}
