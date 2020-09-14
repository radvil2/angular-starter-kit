import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../../../_core/user/user.service';
import { IUser } from '../../../_core/user/user.interface';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../_shared';

import { IRowData } from './row_detail/row_detail';
import { RowDataSource } from './row_data.source';

@Component({
	selector: 'rad-user_info',
	templateUrl: './user_info.component.html',
	styleUrls: ['./user_info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
	rowData: IRowData[] = [];
	dataSource: RowDataSource = new RowDataSource();
	animate = ROUTE_ANIMATIONS_ELEMENTS;
	userId: string;

	constructor(private userSrv: UserService) {}

	ngOnInit() {
		this.getUserDetail();
	}

	getUserDetail() {
		let user: IUser = this.userSrv.getUser();
		this.userId = user.id;
		this.rowData = this.dataSource.setRowData(user);
	}

	ngOnDestroy() {}
}
