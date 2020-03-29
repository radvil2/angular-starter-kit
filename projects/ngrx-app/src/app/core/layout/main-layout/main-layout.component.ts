import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { selectEffectiveTheme, selectIsStickyHeader } from '../../index';
import { routeAnimations } from '../../utils/animations';
import { changePageAnimationsDisabled } from '../../settings/settings.actions';

@Component({
	selector: 'rad-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss'],
	animations: [routeAnimations]
})
export class MainLayoutComponent implements OnInit {
	theme$: Observable<string>;
	isStickyHeader$: Observable<boolean>;

	navigations = [
		{ link: '/about', label: 'About', icon: 'info' },
		{ link: '/admin', label: 'Admin', icon: 'supervisor_account' }
	];

	sideNavigations = [
		...this.navigations,
		{ link: '/settings', label: 'Settings', icon: 'settings' },
		{ link: '/login', label: 'Login', icon: 'fingerprint' }
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
