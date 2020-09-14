import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'rad-user_edit',
	templateUrl: 'user_edit.component.html',
	styleUrls: ['user_edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
	idParam: string;

	private subs: Subscription = new Subscription();

	constructor(private route: ActivatedRoute) {
		this.idParam = this.route.snapshot.params.userId;
	}

	ngOnInit() {
		console.log('[EDIT-PROFILE] [OnInit] Subscribe user___');
	}

	ngOnDestroy() {
		console.log('[EDIT-PROFILE] [OnDestroy] UnSubsribe user___');
	}

	loadUser() { }
}
