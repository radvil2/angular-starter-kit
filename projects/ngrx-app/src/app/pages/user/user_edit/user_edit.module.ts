import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserEditRouting } from './user_edit.routing';

import { UserEditComponent } from './user_edit.component';

@NgModule({
  declarations: [UserEditComponent],
  imports: [CommonModule, UserEditRouting],
})
export class UserEditModule {}
