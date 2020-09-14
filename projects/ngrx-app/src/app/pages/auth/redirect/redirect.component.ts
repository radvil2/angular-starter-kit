import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'rad-redirect-page',
    template: `
        <div id="redirect-page">
            <div class="card">
                <h1>Your account has been created</h1>
                <h3>Now you can go to login</h3>

                <button routerLink="/auth/login" mat-flat-button color="accent">
                    <mat-icon>code</mat-icon>&nbsp;Go Login
                </button>
            </div>
        </div>
    `,
    styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
