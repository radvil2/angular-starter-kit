import { createAction, props } from '@ngrx/store';
import { IAccount } from '../user';

export const authLogin = createAction(
	'[Auth] Login',
	props<{ payload: IAccount }>()
);
export const authRegister = createAction(
	'[Auth] Register',
	props<{ payload: IAccount }>()
);
export const authLogout = createAction('[Auth] Logout');
