import { Component, OnInit, Input } from '@angular/core';
import { IBlog } from '../../../core';
import { TruncatePipe } from '../../index';

@Component({
	selector: 'rad-blog_tile',
	templateUrl: './blog_tile.html',
	styleUrls: ['./blog_tile.scss']
})
export class BlogTile implements OnInit {
	@Input() blog: IBlog;
  // TODO: action buttons to much big, we're going to add save button later

	constructor() {}

	ngOnInit() {
		this.blog.title = new TruncatePipe().transform(this.blog.title, 90);
	}

	showTileMenu() {
		alert('TODO:// Showing Tile Menu!');
	}
	
	navigateToAuthorProfile() {
		alert('TODO:// Navigate to the Author profile!');
	}

	navigateToBlog() {
		alert('TODO:// Navigate to the clicked Blog!');
	}
	
	showActionsWindow() {
		alert('TODO: // Showing Actions Window!');
	}
}
