import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { isLoading, isLoggedIn, logoutA } from '../../_core/auth';
import { selectIsStickyHeader } from '../../_core/settings';
import * as MenuItems from '../menu-items';


@Component({
	selector: 'rad-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

	isStickyHeader$: Observable<boolean>;
	isAuthenticated$: Observable<boolean>;
	isLoading$: Observable<boolean>;

	public menu = MenuItems;

	@Output() onIconClicked = new EventEmitter();

	constructor(private store: Store, private loadingSrv: IsLoadingService) { }

	ngOnInit(): void {
		this.isStickyHeader$ = this.store.select(selectIsStickyHeader);
		this.isAuthenticated$ = this.store.select(isLoggedIn);
		this.isLoading$ = this.store.select(isLoading)
	}

	sendEventToLayout() {
		this.onIconClicked.emit();
	}

	logoutUser() {
		this.loadingSrv.add();

		of(this.store.dispatch(logoutA()))
			.pipe(switchMap(() => this.setLoading()))
			.subscribe()
	}

	private setLoading() {
		return this.isLoading$.pipe(
			tap((yes) => !yes && this.loadingSrv.remove())
		)
	}
}
