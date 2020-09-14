import { Component, Input } from '@angular/core';

import { IUser } from '../../../../_core/_types'
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../_shared';

@Component({
	selector: 'rad-user_detail',
	templateUrl: './user_detail.html',
	styleUrls: ['./user_detail.scss']
})
export class UserDetail {
	@Input('userDetail') user: IUser;

	animate = ROUTE_ANIMATIONS_ELEMENTS;

	constructor() { }
}
