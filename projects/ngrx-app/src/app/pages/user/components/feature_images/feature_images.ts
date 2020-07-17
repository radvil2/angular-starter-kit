import { Component, Input } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/utils/animations';

@Component({
	selector: 'rad-feature_images',
	templateUrl: './feature_images.html',
	styleUrls: ['./feature_images.scss']
})
export class FeatureImages {
	animate = ROUTE_ANIMATIONS_ELEMENTS;

	@Input('featureImages') images: any = [];

	constructor() {}
}
