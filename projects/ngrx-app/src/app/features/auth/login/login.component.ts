import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/utils/animations';

@Component({
	selector: 'rad-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	routerElementsAnimations = ROUTE_ANIMATIONS_ELEMENTS;
	hideP = true;

	constructor(private router: Router) {}

	ngOnInit(): void {}

}
