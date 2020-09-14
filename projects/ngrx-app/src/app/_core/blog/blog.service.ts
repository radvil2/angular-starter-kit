import { Injectable } from '@angular/core';
import { IBlog } from './blog.interface';

@Injectable({ providedIn: 'root' }) export class BlogService {

	constructor() {}

	getBlogs(): IBlog[] {
		
		return [
			{
				id: 'somelongblogid',
				title:
					'What is Closure in JavaScript? and How to Use It?. Mastering The JavaScript Fundamental. lorem ipsum wanna be the brown fox jumps over the lazy dog',
				intro: null,
				content: '',
				image: 'assets/decorations/3.jpg',
				createdAt: 'July 29, 2020',
				updatedAt: 'July 29, 2020',
				author: {
					id: 'somelongidbasedonmongoose',
					name: 'Vladmir Victoria Valeska',
					username: 'victoria',
					picture: 'assets/portraits/1.jpg',
				},
				likes: '13k',
				comments: '66.6k',
				shares: '1.8k'
			},
			{
				id: 'somelongblogid',
				title:
					'What is Prototype in JavaScript? and How to Use It?. Mastering The JavaScript Fundamental.',
				intro:
					'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi molestiae quis reprehenderit tempora non. Ratione dolores id mollitia repudiandae accusamus, voluptate hic placeat, nulla asperiores aut unde ab illum dolorum.',
				image: 'assets/features/1.jpg',
				content: '',
				createdAt: 'July 25, 2020',
				updatedAt: 'July 25, 2020',
				author: {
					id: 'somelongidbasedonmongoose',
					name: 'Vladmir Victoria Valeska',
					username: 'victoria',
					picture: 'assets/portraits/1.jpg',
				},
				likes: '18k',
				comments: '7.7k',
				shares: '2k'
			}
		];
	}
}
