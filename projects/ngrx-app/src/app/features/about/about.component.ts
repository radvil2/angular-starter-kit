import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/utils/animations';

@Component({
  selector: 'rad-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  routeElementsAnimations = ROUTE_ANIMATIONS_ELEMENTS;

  constructor() {}

  ngOnInit(): void {}
}
