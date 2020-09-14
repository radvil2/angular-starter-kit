import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';

// 3rd parties libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// app states
import { reducers, metaReducers } from './core.state';
import { AuthEffects } from './auth';
import { SettingsEffects } from './settings';

// app utils
import { HttpErrorInterceptor, TokenInterceptor, AppErrorHandler } from './handlers';

// app providers
const PROVIDERS = [
	{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
	{ provide: ErrorHandler, useClass: AppErrorHandler }
];

@NgModule({
	providers: [...PROVIDERS],
	imports: [
		HttpClientModule,
		// 3rd parties
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([AuthEffects, SettingsEffects]),
		StoreDevtoolsModule.instrument({
			name: 'Angular Workspace Radvil',
			logOnly: environment.production
		})
	]
})
export class CoreModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule: CoreModule
	) {
		if (parentModule) {
			throw new Error('CoreModule is already loaded. Import only in AppModule');
		}
	}
}
