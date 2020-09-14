import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment as env } from '../../../environments/environment';
import { IUser, ILoginRequest, IRevokeTokenRequest } from '../_types';
import { LocalStorageService } from '../../_shared';

@Injectable({ providedIn: 'root' }) export class AuthService {
	constructor(
		private http: HttpClient,
		private localStorageSrv: LocalStorageService
	) { }

	loginUser(formData: ILoginRequest): Observable<IUser> {
		return this.http
			.post<ILoginRequest>(env.apiUrl + '/users/login', formData, { withCredentials: true })
			.pipe(map((res) => res['doc']));
	}

	getCurrentUser(): Observable<IUser> {
		return this.http
			.get<IUser>(env.apiUrl + '/users/private-profile')
			.pipe(map((res) => res['doc']));
	}

	refreshToken(): Observable<IUser> {
		return this.http
			.get(env.apiUrl + '/users/refresh-token', { withCredentials: true })
			.pipe(
				map((res) => res['doc']),
				tap((doc) => this.localStorageSrv.setItem(env.tokenKey, doc['token']))
			);
	}

	revokeToken(): Observable<any> {
		return this.http
			.post<IRevokeTokenRequest>(env.apiUrl + '/users/revoke-token', {},
				{ withCredentials: true })
	}
}
