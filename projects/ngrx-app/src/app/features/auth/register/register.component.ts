import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/utils/animations';

@Component({
	selector: 'rad-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
	routerElementsAnimations = ROUTE_ANIMATIONS_ELEMENTS;

	constructor() {}

	ngOnInit(): void {}
}
