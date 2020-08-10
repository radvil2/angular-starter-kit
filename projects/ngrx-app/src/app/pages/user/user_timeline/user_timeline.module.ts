import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {
	TileActionsModule,
	WritePostModule,
	TruncatePipe,
	BlogTileModule
} from '../../../_shared';
import { UserDetail, FeatureImages } from '../_components';
import { UserTimelineComponent } from './user_timeline.component';

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
		UserDetail,
		FeatureImages,
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
export class UserTimelineModule {}
