import { Component } from '@angular/core';
import { OnInit } from "@angular/core";

import { IRowData } from '../row_detail/row_detail';
import { RowDetailDataSource } from '../row_detail/row_detail.source';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../_shared';
import { IAccount } from '../../../_core/_types';
import { Store } from '@ngrx/store';
import { currentUser } from '../../../_core/auth';

@Component({
    selector: 'rad-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

    rowData: IRowData[] = [];
    dataSource: RowDetailDataSource = new RowDetailDataSource();

    animate = ROUTE_ANIMATIONS_ELEMENTS;

    constructor(private store: Store) { }

    ngOnInit() {
        this.getAccountDetail();
    }

    getAccountDetail() {
        // const response: IAccount = {
        //     id: 'somelongidbasedonmongoose',
        //     username: 'victoriavaleska',
        //     email: 'victoria@gmail.com',
        //     picture: 'assets/portraits/1.jpg',
        //     createdAt: 'February 18, 2018',
        //     updatedAt: '1 week ago',
        //     lastLogin: '18 minutes ago'
        // }

        this.store.select(currentUser).subscribe(user => {
            this.rowData = this.dataSource.setRowData(user);
        })
    }

    clickRow(row: IRowData) {
        
        if (row.label.toLowerCase() !== 'username' && row.label.toLowerCase() !== 'email') {
            return alert('Unable to patch this')
        }

        return alert(row.label + 'clicked');
    }
}