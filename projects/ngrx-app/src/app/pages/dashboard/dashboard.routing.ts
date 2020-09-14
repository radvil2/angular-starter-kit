import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./_container/dashboard.component";
import { AuthGuard } from "../../_core/auth/auth.guard";
import { AccountComponent } from "./account/account.component";

export const DASHBOARD_PAGES = [
    DashboardComponent, AccountComponent,
]

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'account',
                pathMatch: 'full'
            },
            {
                path: 'account',
                component: AccountComponent,
                data: { title: 'Manage Account' }
            }
        ]
    },
];

@NgModule({
    imports:[ RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRouting { }
