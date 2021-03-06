import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import { SidedContainerModule } from '../../_shared/components';

import { UserFigure } from './component/user_figure/user_figure';
import { UserComponent } from './component/user.component';
import { UserRouting } from './user.routing';

@NgModule({
	declarations: [UserComponent, UserFigure],
	imports: [
		CommonModule,

		MatButtonModule,
		MatIconModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatTabsModule,
		
		SidedContainerModule,
		UserRouting
	]
})
export class UserModule {}
