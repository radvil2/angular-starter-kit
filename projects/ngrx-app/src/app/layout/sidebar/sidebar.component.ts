import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { isLoggedIn } from '../../_core/auth';

import * as MenuItems from '../menu-items';

@Component({
	selector: 'rad-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	public menu = MenuItems;

	isAuthenticated$: Observable<boolean>;

	@Output() onSidebarToggled = new EventEmitter<any>();

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.isAuthenticated$ = this.store.select(isLoggedIn);
	}

	closeSidebar() {
		this.onSidebarToggled.emit();
	}
}
