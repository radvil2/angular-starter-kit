import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '../_shared';
import { IAppState } from './core.state';

export function initStateFromLocalStorage(
	reducer: ActionReducer<IAppState>
): ActionReducer<IAppState> {
	return function (state, action) {
		const newState = reducer(state, action);

		if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
			return { ...newState, ...LocalStorageService.loadInitialState() };
		}

		return newState;
	};
}
