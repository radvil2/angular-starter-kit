import { I_RowData } from '../components/row_detail/row_detail';

export class RowDataSource {

	constructor() {}

	setRowData(data: any): I_RowData[] {
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
				value: `${data.followers} People`
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
			}
		];
	}
}
