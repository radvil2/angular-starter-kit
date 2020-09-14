import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../core.state';
import { IAuthState } from './auth.state';

/**
 * @function authFeatureSelectors
 * @arg IAppState is the global state,
 * @arg IAuthState is the part of state that we want to get,
 * @desc This function take the collections of selectors from the 'auth' object in the global app state
 *
 */
export const authFeatureSelectors = createFeatureSelector<
	IAppState,
	IAuthState
>('auth');

// #region !! authFeature's children selectors
export const isSubmitting = createSelector(
	authFeatureSelectors,
	(authState: IAuthState) => authState.isSubmitting
);

export const isLoading = createSelector(
	authFeatureSelectors,
	(authState: IAuthState) => authState.isLoading
);

export const validationErrors = createSelector(
	authFeatureSelectors,
	(authState: IAuthState) => authState.errors
);

export const isLoggedIn = createSelector(
	authFeatureSelectors,
	(authState: IAuthState) => authState.isLoggedIn
);

export const isAnonymous = createSelector(
	authFeatureSelectors,
	(authState: IAuthState) => authState.isLoggedIn === false
);

export const currentUser = createSelector(
	authFeatureSelectors,
	(authState: IAuthState) => authState.currentUser
);

// #endregion
