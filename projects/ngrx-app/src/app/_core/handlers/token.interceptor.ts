import {
	HttpErrorResponse as HttpErrRes, HttpEvent, HttpHandler, HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import { LocalStorageService } from '../../_shared';
import { getCurrentUserAS, logoutA } from '../auth/auth.actions';
import { AuthService } from '../auth/auth.service';



@Injectable() export class TokenInterceptor implements HttpInterceptor {
	private isRefreshing: boolean;
	private tokenSubject = new BehaviorSubject<string>(null);


	constructor(
		private localStorageSrv: LocalStorageService,
		private authSrv: AuthService,
		private store: Store
	) { }


	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Clone the Authorization header to outgoing request as option (status 204)
		request = this.setAuthHeader(request, this.token);

		// Token expired with status 401
		// http.refreshToken() pipe return user response then set token to LS
		// Retry failed request and pipe store.getCurrentUser()

		return next.handle(request).pipe(
			catchError((err) => {

				// if expired
				if (err instanceof HttpErrRes && err.status === 401) {
					if (!!this.token) return this.refreshToken(request, next);
				}

				// if 403 (refresh token req unauthorized)
				if (err instanceof HttpErrRes && err.status === 403) {
					this.store.dispatch(logoutA());
				}

				// if other error status code
				return throwError(err);
			})
		);
	}


	private setAuthHeader(req: HttpRequest<any>, __token: string) {

		if (__token) return req.clone({ setHeaders: { Authorization: __token } })

		return req;
	}



	private refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (!this.isRefreshing) {

			// Start refreshing token...
			this.isRefreshing = true;
			this.tokenSubject.next(null);

			return this.authSrv.refreshToken().pipe(
				switchMap((res) => {
					this.isRefreshing = false;
					this.tokenSubject.next(res.token);

					// Repeat failed request with new token
					return next
						.handle(this.setAuthHeader(req, res.token))
						.pipe(
							tap(() => this.store.dispatch(
								getCurrentUserAS({ currentUser: res }))
							)
						);
				})
			);
		} else {

			// Wait while getting new token
			return this.tokenSubject.pipe(
				filter((token) => token !== null),
				take(1),

				switchMap((token) => {
					// Repeat failed request with new token
					return next.handle(this.setAuthHeader(req, token))
				})
			);
		}
	} // EOL refreshToken()


	// localStorage token getter
	get token() {
		return this.localStorageSrv.getItem(env.tokenKey);
	}

}
