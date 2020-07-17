import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
	SharedModule,
	TileActions,
	WritePost,
	TruncatePipe
} from '../../../shared';
import { UserDetail, FeatureImages } from '../components';

import { UserTimelineComponent } from './user_timeline.component';
import { BlogTile } from '../../../shared/components/blog_tile/blog_tile';

const routes: Routes = [
	{
		path: '',
		component: UserTimelineComponent,
		data: { title: 'User Timeline' }
	}
];

@NgModule({
	declarations: [
		UserTimelineComponent,
		TileActions,
		UserDetail,
		FeatureImages,
		WritePost,
		BlogTile,

		TruncatePipe
	],
	imports: [RouterModule.forChild(routes), SharedModule],
})
export class UserTimelineModule {}
