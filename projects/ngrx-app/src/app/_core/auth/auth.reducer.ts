import { IAuthState } from './auth.model';
import { createReducer, on, Action } from '@ngrx/store';
import { authLogin, authLogout, authRegister } from './auth.actions';

export const initialAuthState: IAuthState = {
	account: undefined,
	token: null,
	isAuthenticated: false
};

const reducer = createReducer(
	initialAuthState,
	on(authLogin, (state: IAuthState, { payload }) => ({
		...state,
		payload,
		isAuthenticated: true
	})),
	on(authRegister, (state: IAuthState, { payload }) => ({
		...state,
		payload,
		isAuthenticated: false
	})),
	on(authLogout, (state: IAuthState) => ({
		...state,
		token: null,
		isAuthenticated: false
	}))
);

export function authReducer(
	state: IAuthState | undefined,
	action: Action
): IAuthState {
	return reducer(state, action);
}
