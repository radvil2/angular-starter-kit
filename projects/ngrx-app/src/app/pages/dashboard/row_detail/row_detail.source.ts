import { IRowData } from './row_detail';
import { IAccount } from '../../../_core/_types';

export class RowDetailDataSource {

	constructor() { }

	setRowData(data: IAccount): IRowData[] {
		return [
			{
				icon: 'account_circle',
				label: 'Username',
				value: data.username
			},
			{
				icon: 'email',
				label: 'Email',
				value: data.email
			},
			{
				icon: 'event_available',
				label: 'Created',
				value: data.createdAt
			},
			{
				icon: 'edit',
				label: 'Updated',
				value: data.updatedAt
			},
			{
				icon: 'code',
				label: 'Last Login',
				value: data.lastLogin
			},
			{
				icon: 'lock',
				label: 'Password',
				value: `********`
			},
		];
	}
}
