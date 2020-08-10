import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap, mergeMap } from 'rxjs/operators';

import { LocalStorageService, NotificationService } from '../utils';
import { authLogin, authLogout, authRegister } from './auth.actions';
import { AuthService } from './auth.service';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
	constructor(
		private actions$: Actions,
		private lsSrv: LocalStorageService,
		private authSrv: AuthService,
		private router: Router,
		private notificationSrv: NotificationService
	) {}

	login$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authLogin),
				mergeMap(({ payload }) =>
					this.authSrv.loginUser(payload.username, payload.password).pipe(
						tap((token) => {
							this.lsSrv.setItem(AUTH_KEY, { token, isAuthenticated: true });
							this.notificationSrv.success('Login Succeed!');
							this.router.navigate(['/']);
						})
					)
				)
			),
		{ dispatch: false }
	);

	register$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authRegister),
				mergeMap(({ payload }) =>
					this.authSrv.registerUser(payload).pipe(
						tap(() => {
							this.notificationSrv.success('Registration Succeed!');
							this.router.navigate(['/auth/login']);
						})
					)
				)
			),
		{ dispatch: false }
	);

	logout$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authLogout),
				tap(() => {
					this.lsSrv.setItem(AUTH_KEY, { isAuthenticated: false });
					this.notificationSrv.info('Logout Succeed!');
					this.router.navigate(['/auth/login']);
				})
			),
		{ dispatch: false }
	);
}
