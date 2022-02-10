import { BreadcrumbService } from './../../shared/services/breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: 'In-Out Record System', routerLink: ['/'] }
        ]);
    }

    ngOnInit() { }

}
