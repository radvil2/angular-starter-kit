import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../_shared';


@Component({
    selector: 'rad-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    pageTitle: string;
    routeAnimationsEl = ROUTE_ANIMATIONS_ELEMENTS;

    navLinks = [
        { path: 'posts', label: 'Posts' },
        { path: 'account', label: 'Account' },
    ];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.pageTitle = this.route.snapshot.firstChild.data['title'];
    }
}
