import { HttpErrorResponse as HttpErrResp } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom, filter } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import { LocalStorageService, NotificationService } from '../../_shared';
import { IUser } from '../_types';
import {
	getCurrentUserA,
	getCurrentUserAF,
	getCurrentUserAS,

	loginA, loginAF, loginAS,

	logoutA, logoutAF, logoutAS
} from './auth.actions';
import { AuthService } from './auth.service';



@Injectable() export class AuthEffects {

	constructor(
		private actions$: Actions,
		private lsSrv: LocalStorageService,
		private authSrv: AuthService,
		private router: Router,
		private notificationSrv: NotificationService,
	) { }

	// #region !! Login Effect
	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginA),
			switchMap(({ loginRequest, type }) => {
				// make http request call
				return this.authSrv.loginUser(loginRequest).pipe(
					// success case
					map((currentUser: IUser) => {
						// save token to LS
						this.lsSrv.setItem(env.tokenKey, currentUser['token']);
						console.log(type);
						// call login action success
						return loginAS({ currentUser });
					}),

					// failure case
					catchError((errorResponse: HttpErrResp) => {
						// 'of' return all the data
						console.warn(type);
						return of(loginAF({ errors: errorResponse.error }));
					})
				);
			})
		)
	);

	redirectAfterSubmit$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(loginAS),
				tap(({ type }) => {
					console.log(type);
					this.notificationSrv.success('Logged in successfully!!');
					this.router.navigateByUrl('/');
				})
			),
		// tell ngrx to don't dispatch anything
		{ dispatch: false }
	);
	// #endregion

	getCurrentUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getCurrentUserA),
			switchMap(({ type }) => {

				if (!this.lsSrv.getItem(env.tokenKey)) {
					return of(getCurrentUserAF({ errors: new Error('No token') }));
				}

				return this.authSrv.getCurrentUser().pipe(
					map(
						(res: IUser) => getCurrentUserAS({ currentUser: res }),
						console.log(type)
					),
					catchError((err: HttpErrResp) => of(getCurrentUserAF({ errors: err })))
				);
			})
		)
	);

	logout$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(logoutA),
				switchMap(() => {
					// const _token = this.lsSrv.getItem(env.tokenKey);

					return this.authSrv.revokeToken().pipe(
						map(() => {
							this.lsSrv.removeItem(env.tokenKey);
							return logoutAS();
						}),
						catchError((err) => {
							console.log(err);
							return of(logoutAF({ errors: err }));
						})
					)
				})
			),
		// { dispatch: false }
	);

	loggedOut$ = createEffect(
		() => this.actions$.pipe(
			ofType(logoutAS),
			tap(({ type }) => {
				console.log(type);
				this.notificationSrv.info('Logged out!!');
				this.router.navigateByUrl('/auth/login');
			})
		),
		{ dispatch: false }
	)
}
