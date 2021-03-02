import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[spPageLayout],sp-page-layout',
  host: {
    class: 'sp-page-layout',
  },
})
export class PageLayoutDirective {
  @Input() mode: 'card' | 'simple' = 'simple';

  constructor() {}

  @HostBinding('class.sp-page-layout-card')
  get isCard() {
    return this.mode === 'card';
  }

  @HostBinding('class.sp-page-layout-simple')
  get isSimple() {
    return this.mode === 'simple';
  }
}
