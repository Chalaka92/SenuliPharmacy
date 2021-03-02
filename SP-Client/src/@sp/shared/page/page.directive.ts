import { Directive } from '@angular/core';

@Directive({
  selector: '[spPage],sp-page',
  host: {
    class: 'sp-page',
  },
})
export class PageDirective {
  constructor() {}
}
