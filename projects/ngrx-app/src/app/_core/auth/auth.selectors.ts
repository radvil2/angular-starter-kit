import { createSelector } from '@ngrx/store';
import { IAuthState } from './auth.model';
import { selectAuthState } from '../core.state';

export const selectAuth = createSelector(
	selectAuthState,
	(state: IAuthState) => state
);

export const selectIsAuthenticated = createSelector(
	selectAuthState,
	(state: IAuthState) => state.isAuthenticated
);
