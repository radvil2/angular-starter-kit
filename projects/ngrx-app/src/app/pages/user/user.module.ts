import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule, SidedContainer, AdsTile } from '../../shared';
import { UserFigure } from './components/user_figure/user_figure';

import { UserRouting } from './user.routing';
import { UserComponent } from './container/user.component';

@NgModule({
	declarations: [UserComponent, UserFigure, SidedContainer, AdsTile],
	imports: [CommonModule, SharedModule, UserRouting]
})
export class UserModule {}
