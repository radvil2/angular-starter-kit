import { IUser } from '../user/user.interface';

export interface IBlog {
	title: string;
	intro?: string;
	content?: string;
	image: string;
	date: string;
	author: IUser;

	likes?: String;
	comments?: String;
	shares?: String;
}
