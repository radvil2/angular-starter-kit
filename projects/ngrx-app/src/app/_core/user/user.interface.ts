export interface IUser {
	_id?: string;
	name?: string;
	photo?: string;
	coverPicture?: string;
	job?: string;
	company?: string;
	totalPost?: number;
	followers?: number;
	gender?: string;
	birthday?: string;
}

export interface IAccount extends IUser {
	username: string;
	email?: string;
	password: string;
	role?: string;
	createdAt?: string;
	updatedAt?: string;
	lastLogin?: string;
}
