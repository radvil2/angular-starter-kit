import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { HomeRouting } from './home.routing';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRouting]
})
export class HomeModule {}
