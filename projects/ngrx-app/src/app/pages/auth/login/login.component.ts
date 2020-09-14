import { Component, OnInit, OnDestroy } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup, Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { isSubmitting, loginA, validationErrors } from '../../../_core/auth';
import { IBackendErrors } from '../../../_core/_types';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../_shared';



@Component({
	selector: 'rad-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	routeAnimationEl = ROUTE_ANIMATIONS_ELEMENTS;
	hideP = true;
	form: FormGroup;

	isSubmitting$: Observable<boolean>;
	errors: Observable<IBackendErrors | Error>;
	subs$ = new Subscription();

	constructor(
		private store: Store,
		private loadingSrv: IsLoadingService,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.initializeLoginForm();
		this.initializeValues();
	}

	ngOnDestroy() {
		this.subs$.unsubscribe();
	}

	initializeValues(): void {
		this.isSubmitting$ = this.store.select(isSubmitting);
		this.errors = this.store.select(validationErrors);
	}

	initializeLoginForm(): void {
		this.form = this.fb.group({
			username: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required])
		});
	}

	loginUser(): void {
		this.loadingSrv.add();
		this.form.disable();

		const stream$ = of(
			this.store.dispatch(loginA({ loginRequest: this.form.value }))
		).pipe(switchMap(() => this.doneSubmit())).subscribe();

		this.subs$.add(stream$)
	}

	private doneSubmit(): Observable<boolean> {
		return this.isSubmitting$.pipe(
			tap((yes) => !yes && (this.loadingSrv.remove(), this.form.enable()))
		);
	}
}
