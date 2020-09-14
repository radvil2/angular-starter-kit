import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TileActionsModule, WritePostModule, BlogTileModule } from '../../../_shared/components';
import { TruncatePipe } from '../../../_shared/helpers';

import { UserTimelineComponent } from './user_timeline.component';
import { FeatureImages } from './feature_images/feature_images';
import { UserDetail } from './user_detail/user_detail';

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
		FeatureImages,
		UserDetail,
		TruncatePipe
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatProgressBarModule,
		RouterModule.forChild(routes),

		TileActionsModule,
		BlogTileModule,
		WritePostModule,
	]
})
export class UserTimelineModule { }
