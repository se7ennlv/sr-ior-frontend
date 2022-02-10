import { LocalStorageService } from 'ngx-webstorage';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(
        private router: Router,
        private storage: LocalStorageService,
        private jwtService: JwtService,
        private apiService: ApiService
    ) { }

    login(formData: any) {
        const url: string = '/accounts/auth';
        const body = {
            'username': formData.username,
            'password': formData.password
        };

        return this.apiService.post(url, body);
    }

    isAuthenticated(): boolean {
        const token = this.jwtService.getToken();

        if (token) {
            return true;
        } else {
            return false;
        }
    }

    changePassword(body: any) {
        const url: string = '/accounts/password-manage';
        return this.apiService.put(url, body, this.jwtService.getToken());
    }

    logout() {
        this.jwtService.clearToken();
        this.storage.clear();
        this.router.navigate(['/auth']);
        window.location.reload();
    }
}
