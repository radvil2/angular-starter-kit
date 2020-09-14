import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { DashboardRouting, DASHBOARD_PAGES } from './dashboard.routing';

import { SidedContainerModule } from '../../_shared/components';
import { RowDetail } from './row_detail/row_detail';


@NgModule({
    declarations: [...DASHBOARD_PAGES, RowDetail],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,

        MatButtonModule,
        MatIconModule,
        MatTabsModule,

        DashboardRouting,

        SidedContainerModule,
    ]
})
export class DashboardModule { }
