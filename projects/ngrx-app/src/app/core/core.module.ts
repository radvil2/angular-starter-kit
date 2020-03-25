import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// app states
/** TODO: Integrate sticky header setting
 ** TODO: Create settings.component container
 ** TODO: Integrate animation
 */
import { AppState, reducers } from './core.state';
import { SettingsEffects } from './settings/settings.effects';

// materials
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

// app utils
import { HttpErrorInterceptor } from './utils/http-error.interceptor';
import { AppErrorHandler } from './utils/app-error-handler.service';
import { NotificationService } from './utils/notification.service';

// components
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  imports: [
    // vendor
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,

    // materials
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,

    // ngrx
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([SettingsEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Angular Workspace Radvil',
      logOnly: environment.production
    })
  ],
  exports: [
    // materials
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,

    // components
    MainLayoutComponent
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
