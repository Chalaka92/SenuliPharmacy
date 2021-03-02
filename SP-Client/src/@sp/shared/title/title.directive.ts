import { Directive } from '@angular/core';

@Directive({
  selector: '[spTitle],sp-title',
  host: {
    class: 'sp-title',
  },
})
export class TitleDirective {
  constructor() {}
}
