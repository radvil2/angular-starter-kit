import { Directive, Input } from '@angular/core';
import {
	AbstractControl,
	ValidationErrors,
	NG_VALIDATORS,
	ValidatorFn
} from '@angular/forms';
import { Subscription } from 'rxjs';

export function compareValidator(controlNameToCompare: string): ValidatorFn {
	return (c: AbstractControl): ValidationErrors | null => {
		if (c.value === null || c.value.length === 0) return null;

		const controlToCompare = c.root.get(controlNameToCompare);

		if (controlToCompare) {
			const subscription: Subscription = controlToCompare.valueChanges.subscribe(
				() => {
					c.updateValueAndValidity;
					subscription.unsubscribe();
				}
			);
		}

		return controlToCompare && controlToCompare.value !== c.value
			? { compare: true }
			: null;
	};
}

@Directive({
	selector: '[compare]',
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: CompareValidatorDirective,
			multi: true
		}
	]
})
// #region !! USAGE in Template !!
// <mat-form-field class="x-base" color="accent" appearance="fill">
//   <mat-label>Confirm password</mat-label>
//   <input
//     matInput
//     compare="password" // Should match password formControlName !
//     formControlName="confirmPassword"
//     [type]="hideP ? 'password' : 'text'"
//     placeholder="Retype your password"
//   />
//
//   <div *ngIf="pwConfirm.invalid && (pwConfirm.dirty || pwConfirm.touched)">
//     <mat-error *ngIf="pwConfirm.errors['required']">
//       Password confirmation required
//     </mat-error>
//     <mat-error *ngIf="pwConfirm.errors['compare']">
//       Passwords do not match!
//     </mat-error>
//   </div>
//
//   <mat-icon matSuffix (click)="hideP = !hideP">
//     {{ hideP ? 'visibility_off' : 'visibility' }}
//   </mat-icon>
// </mat-form-field>
// #endregion
export class CompareValidatorDirective {
	@Input('compare') controlNameToCompare: string;

	validate(c: AbstractControl): ValidationErrors | null {
		return compareValidator(this.controlNameToCompare)(c);
	}
}
