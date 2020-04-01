import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/utils/animations';

@Component({
	selector: 'rad-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
	routeElementsAnimations = ROUTE_ANIMATIONS_ELEMENTS;
	opened= true;

	adminMenu = [
		{ link: '/home', label: 'Home', icon: 'home' },
		{ link: '/trendings', label: 'Trending', icon: 'whatshot' },
		{ link: '/subscriptions', label: 'Subscriptions', icon: 'subscriptions' }
	];

	constructor() {}

	ngOnInit(): void {}
}
