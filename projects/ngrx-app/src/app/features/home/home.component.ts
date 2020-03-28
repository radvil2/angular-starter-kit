import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/utils/animations';

@Component({
  selector: 'rad-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  routeElementsAnimations = ROUTE_ANIMATIONS_ELEMENTS;

  constructor() {}

  ngOnInit(): void {}
}
