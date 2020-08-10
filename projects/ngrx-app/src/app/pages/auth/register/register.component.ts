import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { authRegister, ROUTE_ANIMATIONS_ELEMENTS } from '../../../_core';
import { ConfirmPasswordValidator } from '../../../_shared';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
	selector: 'rad-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	routeAnimatedEl = ROUTE_ANIMATIONS_ELEMENTS;
	hideP = true;
	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		private loadingSrv: IsLoadingService,
		private store: Store
	) {}

	ngOnInit(): void {
		this.form = this.fb.group(
			{
				name: new FormControl('', [Validators.required]),
				username: new FormControl('', [Validators.required, Validators.minLength(3)]),
				email: new FormControl('', [Validators.required, Validators.minLength(3)]),
				password: new FormControl('', [Validators.required, Validators.minLength(8)]),
				confirmPassword: new FormControl('', [Validators.required])
			},
			{ validator: ConfirmPasswordValidator.MatchPassword }
		);
	}

	registerUser() {
		this.form.disable();
		this.loadingSrv.add(
			of(this.store.dispatch(authRegister({ payload: this.form.value })))
		);

		this.form.enable();
	}
}
