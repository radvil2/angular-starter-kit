import {
	ActionReducerMap,
	MetaReducer,
	createFeatureSelector
} from '@ngrx/store';

import { initStateFromLocalStorage } from './utils';
import { IAuthState } from './auth/auth.model';
import { ISettingsState } from './settings/settings.model';
import { authReducer } from './auth/auth.reducer';
import { settingsReducer } from './settings/settings.reducer';

export const reducers: ActionReducerMap<IAppState> = {
	auth: authReducer,
	settings: settingsReducer,
};

export const metaReducers: MetaReducer<IAppState>[] = [
	initStateFromLocalStorage
];

export const selectSettingsState = createFeatureSelector<
	IAppState,
	ISettingsState
>('settings');

export const selectAuthState = createFeatureSelector<IAppState, IAuthState>('auth');

export interface IAppState {
	readonly auth: IAuthState,
	readonly settings: ISettingsState;
}
