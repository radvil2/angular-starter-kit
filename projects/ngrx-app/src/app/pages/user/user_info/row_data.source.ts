import { IRowData } from './row_detail/row_detail';
import { IUser } from '../../../_core/_types';

export class RowDataSource {

	constructor() { }

	setRowData(data: IUser): IRowData[] {
		return [
			{
				icon: 'account_circle',
				label: 'Full Name',
				value: data.name
			},
			{ icon: 'work', label: 'Work', value: data.job },
			{
				icon: 'email',
				label: 'Email',
				value: data.email
			},
			{
				icon: 'verified_user',
				label: 'Followers',
				value: ``
			},
			{
				icon: 'event_available',
				label: 'Date Join',
				value: `Since ${data.createdAt}`
			},
			{
				icon: 'cake',
				label: 'Birthday',
				value: data.birthday
			},
			{
				icon: 'work',
				label: 'Job',
				value: data.job
			},
			{
				icon: 'code',
				label: 'Company',
				value: data.company
			},
			{
				icon: 'fingerprint',
				label: 'Gender',
				value: data.gender
			},
			{
				icon: 'cake',
				label: 'Birthday',
				value: data.birthday
			}
		];
	}
}
