export enum AuthActionTypes {
	LOGIN = '[Auth] Login',
	LOGIN_SUCCESS = '[Auth] Login Success',
	LOGIN_FAILURE = '[Auth] Login Failure',

	GET_CURRENT_USER = '[Auth] Get Current User',
	GET_CURRENT_USER_SUCCESS = '[Auth] Get Current User Success',
	GET_CURRENT_USER_FAILURE = '[Auth] Get Current User Failure',
	
	LOGOUT = '[Auth] Logout',
	LOGOUT_SUCCESS = '[Auth] Logout Success',
	LOGOUT_FAILURE = '[Auth] Logout Failure'
}

export enum UserActionTypes {

	REGISTER = '[Auth] Register',
	REGISTER_SUCCESS = '[Auth] Register Success',
	REGISTER_FAILURE = '[Auth] Register Failure'

}