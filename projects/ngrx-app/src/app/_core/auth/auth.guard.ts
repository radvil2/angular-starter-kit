import { Injectable } from '@angular/core';
import {
	Router,
	CanActivate,
	ActivatedRouteSnapshot as ActiveSnapshot,
	RouterStateSnapshot as RouterSnapshot,
	UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { currentUser } from './auth.selectors';
import { NotificationService } from '../../_shared';

type canActivateTypes =
	| Observable<boolean | UrlTree>
	| Promise<boolean | UrlTree>
	| boolean
	| UrlTree;

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private notificationSrv: NotificationService,
		private store: Store
	) {}

	canActivate(route: ActiveSnapshot, state: RouterSnapshot): canActivateTypes {
		return this.store.select(currentUser).pipe(
			map((user) => !!user),
			tap((isLogged) => !isLogged && this.redirectUrl(state))
		);
	}

	// helper
	private redirectUrl(state: RouterSnapshot) {
		this.notificationSrv.warn('Please login first!!');
		this.router.navigate(['auth', 'login'], {
			queryParams: { returnUrl: state.url }
		});
	}

	// #region !! With Roles Guard
	// currentUser: IUser;

	// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	// 	this.store
	// 		.select(selectUser)
	// 		.subscribe((user) => (this.currentUser = user));

	// 	if (this.currentUser) {
	// 		// check if route is restricted by role;
	// 		if (
	// 			route.data.roles &&
	// 			route.data.roles.indexOf(this.currentUser.role) === -1
	// 		) {
	// 			// role not authorized;
	// 			this.router.navigate(['auth', 'login']);
	// 			return false;
	// 		}

	// 		// role is authorized;
	// 		return true;
	// 	}

	// 	// not logged in so redirect to login page with the return url;
	// 	this.notificationSrv.warn('Please login first!!');
	// 	this.router.navigate(['auth', 'login'], {
	// 		queryParams: { returnUrl: state.url }
	// 	});
	// 	return false;
	// }
	// #endregion
}
