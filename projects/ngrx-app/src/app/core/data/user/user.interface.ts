export interface IUser {
	_id: string;
	name: string;
	email?: string;
	photo?: string;
	coverPicture?: string;
	createdAt?: string;
	updatedAt?: string;
	lastLogin?: string;

	job?: string;
	company?: string;
	totalPost?: number;
	followers?: number;
	gender?: string;
	birthday?: string;
}
