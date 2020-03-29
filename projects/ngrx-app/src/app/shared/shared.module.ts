import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
	FontAwesomeModule,
	FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
	faPlus,
	faEdit,
	faTrash,
	faTimes,
	faCaretUp,
	faCaretDown,
	faExclamationTriangle,
	faFilter,
	faTasks,
	faCheck,
	faSquare,
	faLanguage,
	faPaintBrush,
	faLightbulb,
	faWindowMaximize,
	faStream,
	faBook
} from '@fortawesome/free-solid-svg-icons';
import { faMediumM, faGithub } from '@fortawesome/free-brands-svg-icons';

@NgModule({
	declarations: [],
	imports: [
		// vendor
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,

		// material
		MatCardModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSlideToggleModule,
		MatIconModule,
		MatSliderModule,
		MatMenuModule,
		MatSelectModule,
		MatTooltipModule,

		// 3rd party
		FontAwesomeModule
	],
	exports: [
		// vendor
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,

		// material
		MatCardModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSlideToggleModule,
		MatIconModule,
		MatSliderModule,
		MatMenuModule,
		MatSelectModule,
		MatTooltipModule,

		// 3rd party
		FontAwesomeModule
	]
})
export class SharedModule {
	constructor(faIconLibrary: FaIconLibrary) {
		faIconLibrary.addIcons(
			faGithub,
			faMediumM,
			faPlus,
			faEdit,
			faTrash,
			faTimes,
			faCaretUp,
			faCaretDown,
			faExclamationTriangle,
			faFilter,
			faTasks,
			faCheck,
			faSquare,
			faLanguage,
			faPaintBrush,
			faLightbulb,
			faWindowMaximize,
			faStream,
			faBook
		);
	}
}
