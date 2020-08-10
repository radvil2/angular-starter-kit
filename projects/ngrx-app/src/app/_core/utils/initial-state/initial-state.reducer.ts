import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { IAppState } from '../../core.state';

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
