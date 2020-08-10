import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
	Router,
	NavigationStart,
	NavigationEnd,
	NavigationCancel,
	NavigationError
} from '@angular/router';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import {
	selectEffectiveTheme,
	selectIsStickyHeader,
	routeAnimations,
} from '../_core';

import { IsLoadingService } from '@service-work/is-loading';

@Component({
	selector: 'rad-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
	animations: [routeAnimations],
	encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
	theme$: Observable<string>;
	isLoading$: Observable<boolean>;
	isStickyHeader$: Observable<boolean>;

	public progressBarStyle = {
		position: 'absolute',
		height: '3px',
		'z-index': '6',
		top: '0'
	};

	constructor(
		private router: Router,
		private loadingSrv: IsLoadingService,
		private store: Store
	) {}

	ngOnInit(): void {
		this.setAppProgressBar();
		this.theme$ = this.store.pipe(select(selectEffectiveTheme));
		this.isStickyHeader$ = this.store.select(selectIsStickyHeader);
	}

	setAppProgressBar() {
		this.isLoading$ = this.loadingSrv.isLoading$();
		this.router.events
			.pipe(
				filter(
					(event) =>
						event instanceof NavigationStart ||
						event instanceof NavigationEnd ||
						event instanceof NavigationCancel ||
						event instanceof NavigationError
				)
			)
			.subscribe((event) => {
				if (event instanceof NavigationStart) {
					this.loadingSrv.add();
					return;
				}

				setTimeout(() => {
					this.loadingSrv.remove();
				}, 500);
			});
	}
}
