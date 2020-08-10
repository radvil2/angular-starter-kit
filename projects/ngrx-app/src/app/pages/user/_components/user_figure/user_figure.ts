import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, ROUTE_ANIMATIONS_ELEMENTS } from '../../../../_core';

@Component({
	selector: 'rad-user_figure',
	templateUrl: './user_figure.html',
	styleUrls: ['./user_figure.scss']
})
export class UserFigure {
	@Input('userDetail') user: IUser

	isLoadingCoverPicture = false;
	isLoadingProfilePicture = true;

	animate = ROUTE_ANIMATIONS_ELEMENTS;

	constructor(private router: Router) {}

	editProfile() {
		this.router.navigate([`profile/edit/${this.user._id}`]);
	}
}
