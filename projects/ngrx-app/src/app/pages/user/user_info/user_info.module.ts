import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';

import { UserInfoComponent } from './user_info.component';
import { RowDetail } from '../components';

const routes: Routes = [
	{
		path: '',
		component: UserInfoComponent,
		data: { title: 'User Info' }
	}
];

@NgModule({
	declarations: [UserInfoComponent, RowDetail],
	imports: [SharedModule, RouterModule.forChild(routes)]
})
export class UserInfoModule {}
