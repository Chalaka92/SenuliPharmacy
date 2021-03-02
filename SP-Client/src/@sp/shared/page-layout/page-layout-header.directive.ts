import { Directive } from '@angular/core';

@Directive({
  selector: '[spPageLayoutHeader],sp-page-layout-header',
  host: {
    class: 'sp-page-layout-header',
  },
})
export class PageLayoutHeaderDirective {
  constructor() {}
}
