import { createAction, props } from '@ngrx/store';
import { AuthActionTypes, IBackendErrors, ILoginRequest, IUser, IAccount } from '../_types';



// #region !! AuthLogin
export const loginA = createAction(
	AuthActionTypes.LOGIN,
	props<{ loginRequest: ILoginRequest }>()
);

export const loginAS = createAction(
	AuthActionTypes.LOGIN_SUCCESS,
	props<{ currentUser: IUser }>()
);

export const loginAF = createAction(
	AuthActionTypes.LOGIN_FAILURE,
	props<{ errors: IBackendErrors }>()
);
// #endregion



// #region !! getCurrentUser Action
export const getCurrentUserA = createAction(
	AuthActionTypes.GET_CURRENT_USER
);

export const getCurrentUserAS = createAction(
	AuthActionTypes.GET_CURRENT_USER_SUCCESS,
	props<{ currentUser: IUser }>()
);

export const getCurrentUserAF = createAction(
	AuthActionTypes.GET_CURRENT_USER_FAILURE,
	props<{ errors: Error }>()
);
// #endregion



export const logoutA = createAction(
	AuthActionTypes.LOGOUT,
);

export const logoutAS = createAction(
	AuthActionTypes.LOGOUT_SUCCESS
);

export const logoutAF = createAction(
	AuthActionTypes.LOGOUT_FAILURE,
	props<{ errors: Error }>()
);
