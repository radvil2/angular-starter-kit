import { Action, createReducer, on } from '@ngrx/store';
import { ISettingsState, NIGHT_MODE_THEME } from './settings.model';
import * as fromActions from './settings.actions';

export const initialState: ISettingsState = {
	theme: 'DEFAULT-THEME',
	autoNightMode: false,
	nightTheme: NIGHT_MODE_THEME,
	hour: 0,
	stickyHeader: false,
	pageAnimations: true,
	pageAnimationsDisabled: false,
	elementsAnimations: true
};

const reducer = createReducer(
	initialState,
	on(
		fromActions.changeTheme,
		fromActions.changeAutoNightMode,
		fromActions.changeHour,
		fromActions.changeStickyHeader,
		fromActions.changePageAnimations,
		fromActions.changeElementsAnimations,
		(state, action) => ({ ...state, ...action })
	),
	on(
		fromActions.changePageAnimationsDisabled,
		(state, { pageAnimationsDisabled }) => ({
			...state,
			pageAnimationsDisabled,
			pageAnimations: false
		})
	)
);

export function settingsReducer(
	state: ISettingsState | undefined,
	action: Action
) {
	return reducer(state, action);
}
