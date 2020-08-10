import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TileActionsModule } from '../tile_actions/tile_actions.module';

import { IBlog } from '../../../_core/blog';
import { TruncatePipe } from '../../helpers';

//#region !! component
@Component({
	selector: 'rad-blog_tile',
	templateUrl: './blog_tile.html',
	styleUrls: ['./blog_tile.scss']
})
export class BlogTileComponent implements OnInit {
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
//#endregion

@NgModule({
	declarations: [BlogTileComponent],
	imports: [CommonModule, MatIconModule, MatButtonModule, TileActionsModule],
	exports: [BlogTileComponent]
})
export class BlogTileModule {}
