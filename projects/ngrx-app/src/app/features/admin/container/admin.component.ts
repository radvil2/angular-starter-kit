import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/utils/animations';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { menuAdmin, selectIsStickyHeader } from '../../../core';

@Component({
	selector: 'rad-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
	routeElementsAnimations = ROUTE_ANIMATIONS_ELEMENTS;
	opened = true;
	menu = menuAdmin;
	isStickyHeader$: Observable<boolean>;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.isStickyHeader$ = this.store.pipe(select(selectIsStickyHeader));
	}
}
