import { LocalStorageService } from 'ngx-webstorage';
import { Account } from './../../shared/interfaces/account';
import { AppService } from './../../shared/services/app.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu-left',
    templateUrl: './menu-left.component.html',
    styleUrls: []
})
export class MenuLeftComponent {
    menuItems: any[];
    account: Account;

    constructor(
        public appService: AppService,
        private storage: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.initMenus();
    }

    initMenus() {
        this.menuItems = [
            {
                label: 'Favorites', icon: 'pi pi-home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            { separator: true },
            {
                label: 'Reports', icon: 'pi pi-fw pi-star', routerLink: ['/reports'],
                items: [
                    { label: 'Raw Data', icon: 'pi pi-fw pi-list', routerLink: ['reports'] },
                    // {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
                ]
            },

        ];

        this.account = this.storage.retrieve('user');
        if (this.account?.role_id == 2) {
            this.showAdminMenus();
        }
    }

    showAdminMenus() {
        this.menuItems.push(
            { separator: true },
            {
                label: 'Admin', icon: 'pi pi-fw pi-star', routerLink: ['/reports'],
                items: [
                    { label: 'Recording', icon: 'pi pi-fw pi-ticket', routerLink: ['recording'] },
                ]
            }
        );
    }

}
