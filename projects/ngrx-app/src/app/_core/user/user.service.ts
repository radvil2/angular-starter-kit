import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as env } from "../../../environments/environment";
import { IUser, IRegisterRequest } from '../_types';

@Injectable({ providedIn: 'root' }) export class UserService {

	constructor(
		private http: HttpClient
	) { }

	registerUser(formData: IRegisterRequest): Observable<IUser> {
		return this.http.post(env.apiUrl + '/users/register', formData)
			.pipe(map(res => res['doc']))
	}

	getUser(): any {
		return {
			id: 'somelongidbasedonmongoose',
			name: 'Victoria V. Valeska',
			email: 'vforvictoria@gmail.com',
			job: 'Fullstack Web Developer',
			company: 'Self Employed',
			totalPost: 77,
			followers: 666,
			gender: 'Male',
			birthday: 'September 27, 1999',
			createdAt: 'February 18, 2018'
		};
	}
}
