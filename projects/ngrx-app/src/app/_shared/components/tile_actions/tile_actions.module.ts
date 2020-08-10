import { Component, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

//#region !! component
@Component({
	selector: 'rad-tile_actions',
	templateUrl: './tile_actions.html',
	styleUrls: ['./tile_actions.scss']
})
export class TileActionsComponent {
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
//#endregion
@NgModule({
	declarations: [TileActionsComponent],
	imports: [CommonModule, MatIconModule],
	exports: [TileActionsComponent]
})
export class TileActionsModule {}
