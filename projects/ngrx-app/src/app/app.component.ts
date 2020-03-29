// import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TitleService } from './core/';

@Component({
	selector: 'rad-root',
	template: `
		<rad-main-layout></rad-main-layout>
	`
})
export class AppComponent implements OnInit {

	constructor(private titleSrv: TitleService) {}

	ngOnInit(): void {
		this.titleSrv.setAppTitle();
	}
}
