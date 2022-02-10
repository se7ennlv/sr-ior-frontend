import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { ReportService } from './../../../core/services/report.service';
import { RecordItem } from './../../../modules/recording/interfaces/record_item';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-record-list',
    templateUrl: './record-list.component.html',
    styles: [
    ]
})
export class RecordListComponent implements OnInit {

    items: RecordItem[];
    dateRange: Date[];
    loading: boolean = true;
    baseUrl: String;

    now = new Date();
    currentDate = formatDate(this.now, 'yyyy-MM-dd', 'en');

    constructor(
        private reportService: ReportService,
        private router: Router
    ) {
        this.baseUrl = environment.ENDPOINT;
    }

    ngOnInit(): void {
        this.reportService.dateRange.subscribe((value) => {
            this.dateRange = value;

            const format = 'yyyy-MM-dd HH:mm:ss';
            const fromDate = formatDate(this.dateRange[0], format, 'en');
            const toDate = formatDate(this.dateRange[1], format, 'en');

            this.fetchRecordItem(fromDate, toDate);
        });
    }

    fetchRecordItem(fromDate: string, toDate: string) {
        this.reportService.fetchAllRecords(fromDate, toDate).subscribe((res) => {
            this.items = res.data;
            this.loading = false;
        });
    }

    goToRawReport() {
        this.router.navigateByUrl('/reports');
    };

}
