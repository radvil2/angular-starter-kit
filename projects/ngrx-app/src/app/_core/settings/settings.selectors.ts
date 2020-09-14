import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISettingsState } from './settings.model';
import { IAppState } from '../core.state';

export const selectSettingsState = createFeatureSelector<
	IAppState,
	ISettingsState
>('settings');

export const selectSettings = createSelector(
	selectSettingsState,
	(state: ISettingsState) => state
);

export const selectTheme = createSelector(
	selectSettings,
	(settings) => settings.theme
);

export const selectAutoNightMode = createSelector(
	selectSettings,
	(settings) => settings.autoNightMode
);

export const selectNightTheme = createSelector(
	selectSettings,
	(settings) => settings.nightTheme
);

export const selectHour = createSelector(
	selectSettings,
	(settings) => settings.hour
);

export const selectIsNightHour = createSelector(
	selectAutoNightMode,
	selectHour,
	(autoNightMode, hour) => autoNightMode && (hour >= 19 || hour <= 7) // above 7:00 PM under 07:00 AM
);

export const selectEffectiveTheme = createSelector(
	selectTheme,
	selectNightTheme,
	selectIsNightHour,
	(theme, nightTheme, isNightHour) =>
		(isNightHour ? nightTheme : theme).toLowerCase()
);

export const selectIsStickyHeader = createSelector(
	selectSettings,
	(state: ISettingsState) => state.stickyHeader
);

export const selectPageAnimations = createSelector(
	selectSettings,
	(settings) => settings.pageAnimations
);

export const selectElementsAnimations = createSelector(
	selectSettings,
	(settings) => settings.elementsAnimations
);
