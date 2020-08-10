import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

//#region !! component
@Component({
	selector: 'rad-write_post',
	templateUrl: './write_post.html',
	styleUrls: ['./write_post.scss']
})
export class WritePostComponent implements OnInit {
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
//#endregion
@NgModule({
	declarations: [WritePostComponent],
	imports: [CommonModule, MatIconModule],
	exports: [WritePostComponent]
})
export class WritePostModule {}
