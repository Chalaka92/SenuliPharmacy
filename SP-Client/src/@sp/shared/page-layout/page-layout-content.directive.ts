import { Directive } from '@angular/core';

@Directive({
  selector: '[spPageLayoutContent],sp-page-layout-content',
  host: {
    class: 'sp-page-layout-content',
  },
})
export class PageLayoutContentDirective {
  constructor() {}
}
