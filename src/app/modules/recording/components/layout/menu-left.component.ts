import { AppService } from './../../../../shared/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu-left',
    templateUrl: './menu-left.component.html',
    styleUrls: []
})
export class MenuLeftComponent implements OnInit {
    model: any[];

    constructor(public appService: AppService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Favorites', icon: 'pi pi-home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            { separator: true },
        ];
    }

}
