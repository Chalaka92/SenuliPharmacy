import { ChartWidgetOptions } from '../../../../../@sp/shared/chart-widget/chart-widget-options.interface';

export class LineChartWidgetOptions extends ChartWidgetOptions {
  gradientFill?: {
    from: string;
    to: string;
  };
}
