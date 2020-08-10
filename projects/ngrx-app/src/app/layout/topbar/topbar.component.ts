import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as MenuItems from '../menu-items';
import {
	selectIsStickyHeader,
	selectIsAuthenticated,
	authLogout,
} from '../../_core';

@Component({
	selector: 'rad-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
	isStickyHeader$: Observable<boolean>;
	isAuthenticated$: Observable<boolean>;
	public menu = MenuItems;
	@Output() onIconClicked = new EventEmitter();

	constructor(private store: Store) {}

	ngOnInit() {
		this.isStickyHeader$ = this.store.select(selectIsStickyHeader);
		this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
	}

	sendEventToLayout() {
		this.onIconClicked.emit();
	}

	logoutUser() {
		this.store.dispatch(authLogout());
	}
}
