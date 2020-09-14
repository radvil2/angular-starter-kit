import { Component, Input } from '@angular/core';

export interface IRowData {
	icon: string;
	label: string;
	value: any;
}

@Component({
	selector: 'rad-row_detail',
	templateUrl: './row_detail.html',
	styleUrls: ['./row_detail.scss']
})
export class RowDetail {
	@Input() public data: IRowData;

	constructor() {}
}
