import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//#region !! component
@Component({
	selector: 'rad-ads_tile',
	template: `
		<div class="ads-tile">
			ADDS Space
		</div>
	`,
	styleUrls: ['./ads_tile.scss']
})
export class AdsTileComponent {
	constructor() {}
}
//#endregion

@NgModule({
	declarations: [AdsTileComponent],
	imports: [CommonModule],
	exports: [AdsTileComponent]
})
export class AdsTileModule {}
