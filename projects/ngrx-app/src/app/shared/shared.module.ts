import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
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
		CommonModule
	],
	exports: [
		// vendor
		CommonModule,

		// material
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatSidenavModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSliderModule,
		MatTabsModule,
		MatToolbarModule,
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
