import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'rad-write_post',
	templateUrl: './write_post.html',
	styleUrls: ['./write_post.scss']
})
export class WritePost implements OnInit {
	user: any = {};

	constructor() {}

	ngOnInit() {
		this.user.photo = '../../../../assets/portraits/1.jpg';
	}

	createNewBlog() {
		const message: string = 'TODO: // Add a new blog post';
		alert(message);
	}
}
