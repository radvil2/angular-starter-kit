import { Action, createReducer, on } from '@ngrx/store';
import { SettingsState, NIGHT_MODE_THEME } from './settings.model';
import * as fromActions from './settings.actions';

export const initialState: SettingsState = {
  theme: 'DEFAULT-THEME',
  autoNightMode: false,
  nightTheme: NIGHT_MODE_THEME,
  hour: 0,
  stickyHeader: true
};

const reducer = createReducer(
  initialState,
  on(
    fromActions.changeTheme,
    fromActions.changeAutoNightMode,
    fromActions.changeHour,
    fromActions.changeStickyHeader,
    (state, action) => ({ ...state, ...action })
  )
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
