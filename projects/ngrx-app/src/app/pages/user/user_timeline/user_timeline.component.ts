import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../../_core/blog/blog.service';
import { UserService } from '../../../_core/user/user.service';
import { IBlog, IUser } from '../../../_core/_types';

import { RowDataSource } from '../user_info/row_data.source';

@Component({
	selector: 'rad-user_timeline',
	templateUrl: './user_timeline.component.html',
	styleUrls: ['./user_timeline.component.scss']
})
export class UserTimelineComponent implements OnInit {
	blogs: IBlog[] = [];
	user: IUser;
	featureImages: Array<string> = [];

	dataSource: RowDataSource = new RowDataSource();

	constructor(private blogSrv: BlogService, private userSrv: UserService) {}

	ngOnInit() {
		this.setBlogs();
		this.getUserDetail();
		this.setFeatureImages();
	}

	getUserDetail() {
		this.user = this.userSrv.getUser();
	}

	setFeatureImages(): void {
		this.featureImages.push(
			'assets/decorations/1.jpg',
			'assets/portraits/1.jpg',
			'assets/decorations/2.jpg',
			'assets/icons/logo.png',
			'assets/decorations/4.jpg',
			'assets/decorations/7.jpg'
		);
	}

	setBlogs(): void {
		this.blogs = this.blogSrv.getBlogs();
	}
}
