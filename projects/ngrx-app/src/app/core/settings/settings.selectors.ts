import { createSelector } from '@ngrx/store';

import { SettingsState } from './settings.model';
import { selectSettingsState } from '../core.state';

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectTheme = createSelector(
  selectSettings,
  settings => settings.theme
);

export const selectAutoNightMode = createSelector(
  selectSettings,
  settings => settings.autoNightMode
);

export const selectNightTheme = createSelector(
  selectSettings,
  settings => settings.nightTheme
);

export const selectHour = createSelector(
  selectSettings,
  settings => settings.hour
);

export const selectIsNightHour = createSelector(
  selectAutoNightMode,
  selectHour,
  (autoNightMode, hour) => autoNightMode && (hour >= 20 || hour <= 7) // above 8:00 PM under 07:00 AM
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
  (state: SettingsState) => state.stickyHeader
)

export const selectPageAnimations = createSelector(
  selectSettings,
  settings => settings.pageAnimations
)

export const selectElementsAnimations = createSelector(
  selectSettings,
  settings => settings.elementsAnimations
)