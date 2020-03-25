import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SettingsRouting, routedComponents } from './settings.routing';

@NgModule({
  declarations: [...routedComponents],
  imports: [SharedModule, SettingsRouting]
})
export class SettingsModule {}
