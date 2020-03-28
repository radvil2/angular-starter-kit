import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { selectEffectiveTheme, selectIsStickyHeader } from '../../index';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'rad-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  // isProd = env.production;
  // envName = env.envName;
  // version = env.versions.app;
  year = new Date().getFullYear();
  theme$: Observable<string>;
  isStickyHeader$: Observable<boolean>;

  navigations = [
    { link: '/home', label: 'Home', icon: 'home' },
    { link: '/about', label: 'About', icon: 'info' },
  ];

  sideNavigations = [
    ...this.navigations,
    { link: '/admin', label: 'Admin', icon: 'supervisor_account' },
    { link: '/settings', label: 'Settings', icon: 'settings' },
    { link: '/login', label: 'Login', icon: 'fingerprint' }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    this.isStickyHeader$ = this.store.pipe(select(selectIsStickyHeader));
  }
}
