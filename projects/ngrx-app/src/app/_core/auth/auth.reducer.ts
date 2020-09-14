import { IAuthState, initialAuthState } from './auth.state';
import { createReducer, on, Action } from '@ngrx/store';
import {
	loginA,
	loginAS,
	loginAF,
	logoutA,
	getCurrentUserA,
	getCurrentUserAS,
	getCurrentUserAF,
	logoutAS,
	logoutAF,
} from './auth.actions';

const reducerX = createReducer(
	initialAuthState,

	// #region !! AuthLoginReducer
	on(
		loginA,
		(state): IAuthState => ({
			...state,
			isSubmitting: true,
			errors: null
		})
	),

	on(
		loginAS,
		(state, action): IAuthState => ({
			...state,
			isSubmitting: false,
			isLoggedIn: true,
			currentUser: action.currentUser
		})
	),

	on(
		loginAF,
		(state, action): IAuthState => ({
			...state,
			isSubmitting: false,
			errors: action.errors
		})
	),
	// #endregion

	// #region getCurrentUser
	on(
		getCurrentUserA,
		(state): IAuthState => ({
			...state,
			isLoading: true
		})
	),

	on(
		getCurrentUserAS,
		(state, action): IAuthState => ({
			...state,
			isSubmitting: false,
			isLoading: false,
			isLoggedIn: true,
			currentUser: action.currentUser
		})
	),

	on(
		getCurrentUserAF,
		(state, action): IAuthState => ({
			...state,
			isLoading: false,
			isLoggedIn: false,
			currentUser: null,
			errors: action.errors
		})
	),
	// #endregion

	on(
		logoutA,
		(state): IAuthState => ({
			...state,
			isLoading: true,
			// isLoggedIn: false
		})
	),

	on(
		logoutAS,
		(state): IAuthState => ({
			...state,
			isLoading: false,
			currentUser: null,
			isLoggedIn: false
		})
	),

	on(
		logoutAF,
		(state, action): IAuthState => ({
			...state,
			isLoading: false,
			errors: action.errors
			// isLoggedIn: false
		})
	),
);

export function authReducer(state: IAuthState, action: Action) {
	// state is the state of reducer and action is what we change in our state
	return reducerX(state, action);
}
