import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { selectEffectiveTheme, selectIsStickyHeader } from '../../index';
import { routeAnimations } from '../../utils/animations';

@Component({
	selector: 'rad-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss'],
	animations: [routeAnimations]
})
export class MainLayoutComponent implements OnInit {
	theme$: Observable<string>;
	isStickyHeader$: Observable<boolean>;

	topNavMenu = [
		{ link: '/admin', label: 'Admin', icon: 'palette' },
		{ link: '/dashboard', label: 'Dashboard', icon: 'format_paint' }
	];

	sideNavMenuOne = [
		{ link: '/home', label: 'Home', icon: 'home' },
		{ link: '/trendings', label: 'Trending', icon: 'whatshot' },
		{ link: '/subscriptions', label: 'Subscriptions', icon: 'subscriptions' },
		...this.topNavMenu
	];

	sideNavMenuTwo = [
		{ link: '/about', label: 'About', icon: 'info' },
		{ link: '/settings', label: 'Settings', icon: 'settings' }
	];

	constructor(
		private breakpointObserver: BreakpointObserver,
		private store: Store
	) {}

	ngOnInit(): void {
		this.theme$ = this.store.pipe(select(selectEffectiveTheme));
		this.isStickyHeader$ = this.store.pipe(select(selectIsStickyHeader));
	}
}
