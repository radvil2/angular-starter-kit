import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TitleService, LocalStorageService } from './_shared';
import { changePageAnimationsDisabled } from './_core/settings/settings.actions'
import { getCurrentUserA } from './_core/auth/auth.actions';


@Component({
	selector: 'rad-root',
	template: `<rad-layout></rad-layout>`
})
export class AppComponent implements OnInit {
	constructor(
		private titleSrv: TitleService,
		private lsSrv: LocalStorageService,
		private store: Store
	) { }

	private static isIEorEdgeOrSafari() {
		return ['ie', 'edge', 'safari'].includes(browser().name);
	}

	ngOnInit(): void {
		this.titleSrv.setAppTitle();
		this.lsSrv.testLocalStorage();

		this.store.dispatch(getCurrentUserA());

		if (AppComponent.isIEorEdgeOrSafari()) {
			this.store.dispatch(
				changePageAnimationsDisabled({
					pageAnimationsDisabled: true
				})
			);
		}
	}
}
