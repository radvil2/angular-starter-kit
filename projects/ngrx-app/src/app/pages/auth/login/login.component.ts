import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	Validators,
	FormGroup
} from '@angular/forms';

import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { authLogin, ROUTE_ANIMATIONS_ELEMENTS, IAccount } from '../../../_core';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
	selector: 'rad-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	routeAnimationEl = ROUTE_ANIMATIONS_ELEMENTS;
	hideP = true;
	form: FormGroup;
	activeUser$: Observable<IAccount>;

	constructor(
		private store: Store,
		private loadingSrv: IsLoadingService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			username: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required])
		});
	}

	loginUser() {
		this.form.disable();
		this.loadingSrv.add(
			of(this.store.dispatch(authLogin({ payload: this.form.value })))
		);
		this.form.enable();
	}
}
