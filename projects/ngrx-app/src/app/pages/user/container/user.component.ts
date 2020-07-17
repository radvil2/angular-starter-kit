import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/utils/animations';
import { IUser } from '../../../core';

@Component({
	selector: 'rad-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	user: IUser;
	animate = ROUTE_ANIMATIONS_ELEMENTS;

	navLinks = [
		{ path: 'timeline', label: 'Timeline' },
		{ path: 'info', label: 'Info' },
		{ path: 'blogs', label: 'Blogs' },
		{ path: 'albums', label: 'Albums' }
	];

	constructor(private route: ActivatedRoute, private router: Router) {
		// this.param = this.route.snapshot.params.id;
	}

	ngOnInit() {
		this.user = {
			_id: "somelongidbasedonmongoose",
			name: "Victoria V. Valeska",
			photo: "assets/portraits/1.jpg",
			coverPicture: "assets/features/1.jpg",
		}
	}
}
