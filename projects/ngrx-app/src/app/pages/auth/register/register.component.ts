import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';
import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { UserService } from '../../../_core/user/user.service';
import {
	ConfirmPasswordValidator,
	NotificationService, ROUTE_ANIMATIONS_ELEMENTS
} from '../../../_shared';



@Component({
	selector: 'rad-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	routeAnimatedEl = ROUTE_ANIMATIONS_ELEMENTS;
	hideP = true;
	form: FormGroup;

	isSubmitting: boolean;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private userSrv: UserService,
		private loadingSrv: IsLoadingService,
		private notifSrv: NotificationService
	) { }

	ngOnInit(): void {
		this.initRegistrationForm();
	}

	initRegistrationForm(): void {
		this.form = this.fb.group({
			name: new FormControl('', [Validators.required]),
			username: new FormControl('', [Validators.required, Validators.minLength(3)]),
			email: new FormControl('', [Validators.required, Validators.minLength(3)]),
			password: new FormControl('', [Validators.required, Validators.minLength(8)]),
			confirmPassword: new FormControl('', [Validators.required])

		}, { validator: ConfirmPasswordValidator.MatchPassword });
	}

	registerUser() {
		const stream$ = this.userSrv.registerUser(this.form.value).pipe(
			tap(() => {
				this.isSubmitting = true;
				this.notifSrv.success('Registration succeded')
				this.router.navigate(['auth', 'redirecting']);
			}),
			catchError(err => of(this.notifSrv.error(err))),
			finalize(() => this.isSubmitting = false)
		)

		this.loadingSrv.add(stream$);
	}
}
