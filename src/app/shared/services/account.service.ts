import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(
        private apiService: ApiService,
        private storage: LocalStorageService,
        private router: Router,
    ) { }

    getProfile(token: string) {
        const url: string = '/accounts/profile';
        return this.apiService.getProfile(url, token).subscribe((res) => {
            if (res) {
                this.storage.store('user', res);
                this.router.navigateByUrl('/');
            } else {
                this.router.navigate(['/auth']);
            }
        });
    }

}
