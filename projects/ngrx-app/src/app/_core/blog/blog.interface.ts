import { TBase } from '../_types';

export interface IBlog extends TBase {
	title: string;
	content: string;
	author: Author;

	intro?: string;
	image?: string;
	likes?: string;
	comments?: string;
	shares?: string;
}

export interface Author extends TBase {
	name: string,
	username: string,
	picture: string,
}