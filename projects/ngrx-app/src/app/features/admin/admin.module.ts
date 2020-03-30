import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AdminRouting } from './admin.routing';
import { AdminComponent } from './container/admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [SharedModule, AdminRouting]
})
export class AdminModule {}
