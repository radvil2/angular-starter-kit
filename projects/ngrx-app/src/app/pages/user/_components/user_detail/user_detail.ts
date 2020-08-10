import { Component, Input } from '@angular/core';

import { IUser, ROUTE_ANIMATIONS_ELEMENTS } from '../../../../_core';

@Component({
	selector: 'rad-user_detail',
	templateUrl: './user_detail.html',
	styleUrls: ['./user_detail.scss']
})
export class UserDetail {
	@Input('userDetail') user: IUser;

	animate = ROUTE_ANIMATIONS_ELEMENTS;
	
	constructor() {}
}
