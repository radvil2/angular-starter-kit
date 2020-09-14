import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '../../../../_core/_types'
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../_shared';

@Component({
	selector: 'rad-user_figure',
	templateUrl: './user_figure.html',
	styleUrls: ['./user_figure.scss']
})
export class UserFigure {
	@Input('userDetail') user: IUser | any;

	isLoadingCoverPicture = false;
	isLoadingProfilePicture = true;

	animate = ROUTE_ANIMATIONS_ELEMENTS;

	constructor(private router: Router) {}

	editProfile() {
		this.router.navigate([`profile/edit/${this.user.id}`]);
	}
}
