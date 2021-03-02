import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  SPCard,
  SPCardActions,
  SPCardContent,
  SPCardHeader,
  SPCardHeaderActions,
  SPCardHeaderSubTitle,
  SPCardHeaderTitle,
} from './card.component';

const cardComponents = [
  SPCard,
  SPCardHeader,
  SPCardHeaderTitle,
  SPCardHeaderSubTitle,
  SPCardHeaderActions,
  SPCardContent,
  SPCardActions,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...cardComponents],
  exports: [...cardComponents],
})
export class SPCardModule {}
