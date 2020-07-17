import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/utils/animations';
import { IUser } from '../../../../core';

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
