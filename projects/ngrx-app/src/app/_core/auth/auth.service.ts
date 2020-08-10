import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAccount } from '../user/user.interface';
import { environment as env } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(private http: HttpClient) {}

	loginUser(username: string, password: string): Observable<string> {
		return this.http
			.post<IAccount>(env.apiUrl + '/users/login', { username, password })
			.pipe(map((res) => res['token']));
	}

	registerUser(data: IAccount): Observable<IAccount> {
		return this.http
			.post<IAccount>(env.apiUrl + '/users/register', data)
			.pipe(map((res) => res['doc']));
	}
}
