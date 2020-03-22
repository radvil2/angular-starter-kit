import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'rad-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  navMenu = [
    { link: '/home', label: 'Home', icon: 'home' },
    { link: '/sites', label: 'Sites', icon: 'list' },
    { link: '/about', label: 'About', icon: 'info' },
    { link: '/login', label: 'Login', icon: 'fingerprint' },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
