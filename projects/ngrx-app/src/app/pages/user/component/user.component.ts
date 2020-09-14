import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IUser } from '../../../_core/_types';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../_shared';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUser } from '../../../_core/auth';

@Component({
	selector: 'rad-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	user: IUser | any;
	animate = ROUTE_ANIMATIONS_ELEMENTS;

	navLinks = [
		{ path: 'timeline', label: 'Timeline' },
		{ path: 'info', label: 'Info' },
		{ path: 'blogs', label: 'Blogs' },
		{ path: 'albums', label: 'Albums' }
	];

	constructor(private store: Store) {
		
	}

	ngOnInit() {
		// this.user = {
		// 	id: "somelongidbasedonmongoose",
		// 	name: "Victoria V. Valeska",
		// 	picture: "assets/portraits/1.jpg",
		// 	coverPicture: "assets/features/1.jpg",
		// }

		this.store.select(currentUser).subscribe(user => this.user = user);
	}
}
