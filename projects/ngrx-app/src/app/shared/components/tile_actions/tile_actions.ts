import { Component, Input } from '@angular/core';

@Component({
	selector: 'rad-tile_actions',
	templateUrl: './tile_actions.html',
	styleUrls: ['./tile_actions.scss']
})
export class TileActions {
	constructor() {}

	toggleLike() {
		alert('TODO:// Add (or) remove like!');
	}

	toggleComment() {
		alert('TODO:// Add (or) manage comment in window!');
	}

	toggleShare() {
		alert('TODO:// Open Share Window!');
	}
}
