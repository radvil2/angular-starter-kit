import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SettingsRouting } from './settings.routing';
import { SettingsComponent } from './container/settings.component';

@NgModule({
	declarations: [SettingsComponent],
	imports: [
		CommonModule,
		FormsModule,

		// angular materials
		MatIconModule,
		MatFormFieldModule,
		MatSelectModule,
		MatSlideToggleModule,

		SettingsRouting
	]
})
export class SettingsModule {}
