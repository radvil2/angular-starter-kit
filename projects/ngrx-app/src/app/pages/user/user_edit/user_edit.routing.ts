import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEditComponent } from './user_edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserEditComponent,
    data: { title: 'Edit user' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserEditRouting {}
