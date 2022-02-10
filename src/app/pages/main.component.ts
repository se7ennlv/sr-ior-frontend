import { BreadcrumbService } from '../shared/services/breadcrumb.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppService } from '../shared/services/app.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
    public items: MenuItem[];

    constructor(
        public appService: AppService,
        public breadcrumbService: BreadcrumbService
    ) {
        this.appService.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }

    ngOnInit() { }

    onLayoutClick() {
        this.appService.onLayoutClick();
    }

    ngOnDestroy() {
        if (this.appService.subscription) {
            this.appService.subscription.unsubscribe();
        }
    }
}
