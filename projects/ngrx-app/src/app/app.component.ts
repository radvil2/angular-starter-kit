import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import {
	Router,
	NavigationStart,
	NavigationEnd,
	NavigationCancel,
	NavigationError,
	ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IsLoadingService } from '@service-work/is-loading';
import { TitleService, LocalStorageService } from './core/';
import { Store } from '@ngrx/store';
import { changePageAnimationsDisabled } from './core/settings/settings.actions';

@Component({
	selector: 'rad-root',
	template: `
		<mat-progress-bar
			*ngIf="isLoading$ | async"
			mode="indeterminate"
			color="primary"
			style="position: absolute; top: 0; z-index: 999; height: 3px;"
		></mat-progress-bar>

		<rad-main-layout></rad-main-layout>
	`
})
export class AppComponent implements OnInit {
	isLoading$: Observable<boolean>;

	constructor(
		private router: Router,
		private loadingSrv: IsLoadingService,
		private titleSrv: TitleService,
		private lsSrv: LocalStorageService,
		private store: Store
	) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

	ngOnInit(): void {
		this.lsSrv.testLocalStorage();
		
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        changePageAnimationsDisabled({
          pageAnimationsDisabled: true
        })
      );
    }
		
		this.titleSrv.setAppTitle();
	}

	// set app progress bar
	setAppProgressBar() {
		this.isLoading$ = this.loadingSrv.isLoading$();
		this.router.events
			.pipe(
				filter(
					event =>
						event instanceof NavigationStart ||
						event instanceof NavigationEnd ||
						event instanceof NavigationCancel ||
						event instanceof NavigationError
				)
			)
			.subscribe(event => {
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
