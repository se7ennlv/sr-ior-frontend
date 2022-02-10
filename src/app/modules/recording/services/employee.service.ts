import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private apiService: ApiService) { }

    getOneEmp(id: any) {
        const url: string = `/employees/${id}`;
        return this.apiService.get(url);
    }
}
