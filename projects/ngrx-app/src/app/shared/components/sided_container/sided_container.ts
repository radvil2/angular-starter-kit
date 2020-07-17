import { Component } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/utils/animations';

@Component({
  selector: 'rad-sided_container',
  templateUrl: './sided_container.html',
  styleUrls: ['./sided_container.scss']
})
export class SidedContainer {
	animate = ROUTE_ANIMATIONS_ELEMENTS;

	navLinks = [
		{ path: 'timeline', label: 'Timeline' },
		{ path: 'info', label: 'Info' },
		{ path: 'blogs', label: 'Blogs' },
		{ path: 'albums', label: 'Albums' }
  ];
  
  constructor() {}
}