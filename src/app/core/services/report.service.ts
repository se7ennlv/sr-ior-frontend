import { JwtService } from './jwt.service';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    token: string;

    private _dateRange = new BehaviorSubject([]);
    dateRange = this._dateRange.asObservable();

    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
    ) {
        this.token = this.jwtService.getToken();
    }

    changeDate(getDate: Date[]) {
        this._dateRange.next(getDate);
    }

    fetchAllRecords(fromDate: any, toDate: any) {
        const url: string = `/reports/${fromDate}/${toDate}`;
        return this.apiService.get(url, this.token);
    }

    fetchAllSummaryReport(fieldName: string, fromDate: any, toDate: any) {
        const url: string = `/reports/summary/${fieldName}/${fromDate}/${toDate}`;
        return this.apiService.get(url, this.token);
    }


}
