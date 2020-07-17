import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SettingsRouting } from './settings.routing';
import { SettingsComponent } from './container/settings.component';

@NgModule({
	declarations: [SettingsComponent],
	imports: [FormsModule, SharedModule, SettingsRouting]
})
export class SettingsModule {}
