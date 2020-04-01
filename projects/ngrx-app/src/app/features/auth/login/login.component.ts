import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/utils/animations';
import { Router } from '@angular/router';

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
