import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigPanelComponent } from './config-panel.component';
import { SpSharedModule } from '../../../@sp/sp-shared.module';
import { ConfigPanelToggleComponent } from './config-panel-toggle/config-panel-toggle.component';

@NgModule({
  imports: [CommonModule, SpSharedModule],
  declarations: [ConfigPanelComponent, ConfigPanelToggleComponent],
  exports: [ConfigPanelComponent, ConfigPanelToggleComponent],
})
export class ConfigPanelModule {}
