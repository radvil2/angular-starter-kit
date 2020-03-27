import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRouting],
  bootstrap: [AppComponent]
})
export class AppModule {}
