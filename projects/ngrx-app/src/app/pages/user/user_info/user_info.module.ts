import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { UserInfoComponent } from './user_info.component';
import { RowDetail } from '../_components';

const routes: Routes = [
	{
		path: '',
		component: UserInfoComponent,
		data: { title: 'User Info' }
	}
];

@NgModule({
	declarations: [UserInfoComponent, RowDetail],
	imports: [CommonModule, MatIconModule, RouterModule.forChild(routes)]
})
export class UserInfoModule {}
