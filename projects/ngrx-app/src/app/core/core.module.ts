import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// app states
/** TODO: Set app loading on init
 */
import { AppState, reducers, metaReducers } from './core.state';
import { SettingsEffects } from './settings/settings.effects';

// materials
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

// app utils
import { HttpErrorInterceptor } from './utils/http-error.interceptor';
import { AppErrorHandler } from './utils/app-error-handler.service';
import { NotificationService } from './utils/notification.service';

// Fontawesome icons
import {
	FaIconLibrary,
	FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
	faCog,
	faBars,
	faRocket,
	faPowerOff,
	faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import {
	faGithub,
	faFacebook,
	faTwitter,
	faInstagram,
	faYoutube
} from '@fortawesome/free-brands-svg-icons';

// components
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { FooterComponent } from './layout/footer/footer.component';

const LAYOUT_COMPONENTS = [MainLayoutComponent, FooterComponent];

const PROVIDERS = [
	{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
	{ provide: ErrorHandler, useClass: AppErrorHandler }
];

@NgModule({
	declarations: [...LAYOUT_COMPONENTS],
	providers: [...PROVIDERS],
	imports: [
		// vendor
		CommonModule,
		RouterModule,

		// materials
		MatButtonModule,
		MatMenuModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatIconModule,
		MatListModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatToolbarModule,

		// 3rd party
		FontAwesomeModule,

		// ngrx
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([SettingsEffects]),
		StoreDevtoolsModule.instrument({
			name: 'Angular Workspace Radvil',
			logOnly: environment.production
		})
	],
	exports: [
		// materials
		MatButtonModule,
		MatMenuModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatIconModule,
		MatListModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatToolbarModule,

		// 3rd party
		FontAwesomeModule,

		// components
		MainLayoutComponent
	]
})
export class CoreModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule: CoreModule,
		faIconLibrary: FaIconLibrary
	) {
		if (parentModule) {
			throw new Error('CoreModule is already loaded. Import only in AppModule');
		}
		faIconLibrary.addIcons(
			faCog,
			faBars,
			faRocket,
			faPowerOff,
			faUserCircle,
			faGithub,
			faFacebook,
			faTwitter,
			faInstagram,
			faYoutube
		);
	}
}
