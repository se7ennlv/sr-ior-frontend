import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private storage: LocalStorageService) {
  }

  setToken(token: string) {
    this.storage.store('token', token);
  }

  getToken() {
    return this.storage.retrieve('token');
  }

  clearToken() {
    this.storage.clear('token');
  }

  headers() {
    const token = this.getToken();

    return {
      'Authorization': 'Bearer ' + token?.access_token
    };
  }

}
