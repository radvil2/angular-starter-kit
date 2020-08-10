import { Component, OnInit, OnDestroy } from '@angular/core';

import { IUser, UserService, ROUTE_ANIMATIONS_ELEMENTS } from '../../../_core';
import { I_RowData } from '../_components';
import { RowDataSource } from './row_data.source';

@Component({
	selector: 'rad-user_info',
	templateUrl: './user_info.component.html',
	styleUrls: ['./user_info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
	rowData: I_RowData[] = [];
	dataSource: RowDataSource = new RowDataSource();
	animate = ROUTE_ANIMATIONS_ELEMENTS;
	userId: string;

	constructor(private userSrv: UserService) {}

	ngOnInit() {
		this.getUserDetail();
	}

	getUserDetail() {
		let user: IUser = this.userSrv.getUser();
		this.userId = user._id;
		this.rowData = this.dataSource.setRowData(user);
	}

	ngOnDestroy() {}
}
