import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { selectEffectiveTheme, selectIsStickyHeader } from '../../index';
import { routeAnimations } from '../../utils/animations';
import * as MenuItems from '../menu-items';

@Component({
	selector: 'rad-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss'],
	animations: [routeAnimations]
})
export class MainLayoutComponent implements OnInit {
	theme$: Observable<string>;
	isStickyHeader$: Observable<boolean>;
	menu = MenuItems;

	constructor(
		private breakpointObserver: BreakpointObserver,
		private store: Store
	) {}

	ngOnInit(): void {
		this.theme$ = this.store.pipe(select(selectEffectiveTheme));
		this.isStickyHeader$ = this.store.pipe(select(selectIsStickyHeader));
	}
}
