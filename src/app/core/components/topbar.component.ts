import { ChangePasswordComponent } from './../../pages/authentication/components/change-password.component';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { AuthService } from './../services/auth.service';
import { AppService } from './../../shared/services/app.service';
import { BreadcrumbService } from './../../shared/services/breadcrumb.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Account } from 'src/app/shared/interfaces/account';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})
export class TopBarComponent implements OnDestroy {
    @ViewChild(ChangePasswordComponent) child: ChangePasswordComponent;

    subscription: Subscription;
    items: MenuItem[];

    account: Account;
    endpoint: string;

    constructor(
        public breadcrumbService: BreadcrumbService,
        public appService: AppService,
        private storage: LocalStorageService,
        private authService: AuthService
    ) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
        this.endpoint = environment.ENDPOINT;
    }

    ngOnInit(): void {
        this.account = this.storage.retrieve('user');
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    changePassword() {
        this.child.showDialog = true;
    }

    logout() {
        this.authService.logout();
    }
}
