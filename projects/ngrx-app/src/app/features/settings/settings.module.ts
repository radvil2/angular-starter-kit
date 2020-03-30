import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SettingsRouting } from './settings.routing';
import { SettingsComponent } from './container/settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [SharedModule, SettingsRouting]
})
export class SettingsModule {}
