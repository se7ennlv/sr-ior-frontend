import { environment } from './../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiUrl: string;

    constructor(
        private http: HttpClient,
    ) {
        this.apiUrl = environment.API_URL;
    }


    public handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

    getProfile(path: string, token: string): Observable<any> {
        const url: string = `${this.apiUrl}${path}`;
        const headers = { 'Authorization': 'Bearer ' + token };
        return this.http.get<any>(url, { headers: headers }).pipe(catchError(this.handleError));
    }

    get(path: string, token: string = ''): Observable<any> {
        const url: string = `${this.apiUrl}${path}`;
        const headerOptions = { 'Authorization': 'Bearer ' + token };
        return this.http.get<any>(url, { headers: headerOptions }).pipe(catchError(this.handleError));
    }

    put(path: string, body: Object = {}, token: string = ''): Observable<any> {
        const url: string = `${this.apiUrl}${path}`;
        const headerOptions = { 'Authorization': 'Bearer ' + token };
        return this.http.put<any>(url, body, { headers: headerOptions }).pipe(catchError(this.handleError));
    }

    post(path: string, body: any, token: string = ''): Observable<any> {
        const url: string = `${this.apiUrl}${path}`;
        const headerOptions = { 'Authorization': 'Bearer ' + token };
        return this.http.post<any>(url, body, { headers: headerOptions }).pipe(catchError(this.handleError));
    }

    delete(path: string, token: string = ''): Observable<any> {
        const url: string = `${this.apiUrl}${path}`;
        const headerOptions = { 'Authorization': 'Bearer ' + token };
        return this.http.delete<any>(url, { headers: headerOptions }).pipe(catchError(this.handleError));
    }
}
