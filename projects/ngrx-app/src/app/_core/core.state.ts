import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { initStateFromLocalStorage } from './init.reducer';
import { IAuthState } from './auth/auth.state';
import { ISettingsState } from './settings/settings.model';

import { authReducer } from './auth/auth.reducer';
import { settingsReducer } from './settings/settings.reducer';

export const reducers: ActionReducerMap<IAppState> = {
	auth: authReducer,
	settings: settingsReducer
};

export const metaReducers: MetaReducer<IAppState>[] = [
	initStateFromLocalStorage
];

export interface IAppState {
	readonly auth: IAuthState;
	readonly settings: ISettingsState;
}
