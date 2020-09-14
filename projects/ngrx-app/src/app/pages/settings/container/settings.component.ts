import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromActions from '../../../_core/settings/settings.actions';
import { ISettingsState, IState } from '../../../_core/settings/settings.model';
import { selectSettings } from '../../../_core/settings/settings.selectors';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../_shared';

@Component({
	selector: 'rad-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
	routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
	settings$: Observable<ISettingsState>;

	themes = [
		{ value: 'DEFAULT-THEME', label: 'Default Theme' },
		{ value: 'WHITE-THEME', label: 'White Theme' },
		{ value: 'BLACK-THEME', label: 'Black Theme' }
	];

	constructor(private store: Store<IState>) {}

	ngOnInit() {
		this.settings$ = this.store.pipe(select(selectSettings));
	}

	onThemeSelect({ value: theme }) {
		this.store.dispatch(fromActions.changeTheme({ theme }));
	}

	onAutoNightModeToggle({ checked: autoNightMode }) {
		this.store.dispatch(fromActions.changeAutoNightMode({ autoNightMode }));
	}

	onStickyHeaderToggle({ checked: stickyHeader }) {
		this.store.dispatch(fromActions.changeStickyHeader({ stickyHeader }));
	}

	onPageAnimationsToggle({ checked: pageAnimations }) {
		this.store.dispatch(fromActions.changePageAnimations({ pageAnimations }));
	}

	onElementsAnimationsToggle({ checked: elementsAnimations }) {
		this.store.dispatch(
			fromActions.changeElementsAnimations({ elementsAnimations })
		);
	}
}
