import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../_core/utils/animations';
import { AdsTileModule } from '../ads_tile/ads_tile.module';

//#region !! component
@Component({
	selector: 'rad-sided_container',
	templateUrl: './sided_container.html',
	styleUrls: ['./sided_container.scss']
})
export class SidedContainerComponent {
	animate = ROUTE_ANIMATIONS_ELEMENTS;

	navLinks = [
		{ path: 'timeline', label: 'Timeline' },
		{ path: 'info', label: 'Info' },
		{ path: 'blogs', label: 'Blogs' },
		{ path: 'albums', label: 'Albums' }
	];

	constructor() {}
}
//#endregion

@NgModule({
	declarations: [SidedContainerComponent],
	imports: [CommonModule, AdsTileModule],
	exports: [SidedContainerComponent]
})
export class SidedContainerModule {}
