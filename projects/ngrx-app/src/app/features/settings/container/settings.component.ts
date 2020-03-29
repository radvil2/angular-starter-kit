import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/utils/animations';
import * as fromActions from '../../../core/settings/settings.actions';
import { SettingsState, State } from '../../../core/settings/settings.model';
import { selectSettings } from '../../../core/settings/settings.selectors';

@Component({
	selector: 'rad-settings',
	templateUrl: './settings.component.html',
	styles: ['./settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
	routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
	settings$: Observable<SettingsState>;

	themes = [
		{ value: 'DEFAULT-THEME', label: 'Default Theme' },
		{ value: 'BLACK-THEME', label: 'Black Theme' }
	];

	constructor(private store: Store<State>) {}

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
