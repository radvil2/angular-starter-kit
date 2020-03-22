import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRouting, StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })],
  bootstrap: [AppComponent]
})
export class AppModule {}
