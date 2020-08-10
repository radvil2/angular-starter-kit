import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './_container/user.component';

const routes: Routes = [
	{
		path: '',
		component: UserComponent,
		children: [
			{
				path: '',
				redirectTo: 'timeline',
				pathMatch: 'full'
			},
			{
				path: 'timeline',
				loadChildren: () =>
					import('./user_timeline/user_timeline.module').then(
						(m) => m.UserTimelineModule
					)
			},
			{
				path: 'info',
				loadChildren: () =>
					import('./user_info/user_info.module').then((m) => m.UserInfoModule)
			}
		]
	},
	{
		path: 'edit/:userId',
		loadChildren: () =>
			import('./user_edit/user_edit.module').then((m) => m.UserEditModule)
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRouting {}
