import { Injectable } from '@angular/core';
import { IUser } from './user.interface';

@Injectable({ providedIn: 'root' })

export class UserService {
	constructor() {}

	getUser(): IUser {
		return {
			_id: 'somelongidbasedonmongoose',
			name: 'Victoria V. Valeska',
			// email: 'vforvictoria@gmail.com',
			job: 'Fullstack Web Developer',
			company: 'Self Employed',
			totalPost: 77,
			followers: 666,
			gender: 'Male',
			birthday: 'September 27, 1999',
			// createdAt: 'February 18, 2018'
		};
	}
}
