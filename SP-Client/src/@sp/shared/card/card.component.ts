import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  ViewEncapsulation,
} from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'sp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { class: 'sp-card' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SPCard {}

// noinspection TsLint
@Component({
  selector: 'sp-card-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sp-card-header' },
  template: `
    <div class="sp-card-header-heading-group">
      <ng-content select="sp-card-header-heading"></ng-content>
      <ng-content select="sp-card-header-subheading"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="sp-card-header-actions"></ng-content>
  `,
})
export class SPCardHeader {}

// noinspection TsLint
@Component({
  selector: 'sp-card-content',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sp-card-content' },
  template: ` <ng-content></ng-content>`,
})
export class SPCardContent {}

// noinspection TsLint
@Directive({
  selector: 'sp-card-header-heading',
  host: { class: 'sp-card-header-heading' },
})
export class SPCardHeaderTitle {}

// noinspection TsLint
@Directive({
  selector: 'sp-card-header-subheading',
  host: { class: 'sp-card-header-subheading' },
})
export class SPCardHeaderSubTitle {}

// noinspection TsLint
@Directive({
  selector: 'sp-card-header-actions',
  host: { class: 'sp-card-header-actions' },
})
export class SPCardHeaderActions {}

// noinspection TsLint
@Directive({
  selector: 'sp-card-actions',
  host: {
    class: 'sp-card-actions',
    '[class.sp-card-actions-align-end]': 'align === "end"',
  },
})
export class SPCardActions {
  /** Position of the actions inside the card. */
  @Input() align: 'start' | 'end' = 'start';
}
