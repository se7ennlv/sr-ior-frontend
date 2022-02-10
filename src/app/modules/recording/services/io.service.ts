import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class IoService {

  constructor(private apiService: ApiService) { }

  create(body: any) {
    const url: string = '/trans';
    return this.apiService.post(url, body);
  }

  read(id: any) {
    const url: string = `/trans/${id}`;
    return this.apiService.get(url);
  }

  update(id: any, body: any) {
    const url: string = `/trans/${id}`;
    return this.apiService.put(url, body);
  }
}
