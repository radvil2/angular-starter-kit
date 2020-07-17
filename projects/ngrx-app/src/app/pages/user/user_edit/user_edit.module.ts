import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { UserEditRouting } from './user_edit.routing';

import { UserEditComponent } from './user_edit.component';

@NgModule({
  declarations: [UserEditComponent],
  imports: [SharedModule, UserEditRouting],
})
export class UserEditModule {}
