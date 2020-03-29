import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AboutRouting } from './about.routing';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [SharedModule, AboutRouting]
})
export class AboutModule {}
