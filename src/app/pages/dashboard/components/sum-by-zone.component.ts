import { ReportService } from './../../../core/services/report.service';
import { formatDate } from '@angular/common';
import { SummaryReport } from 'src/app/core/interfaces/summary_report';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sum-by-zone',
    templateUrl: './sum-by-zone.component.html',
    styles: [
    ]
})
export class SumByZoneComponent implements OnInit {
    items: SummaryReport[];
    dateRange: Date[];
    total: number = 0;

    constructor(private reportService: ReportService) { }

    ngOnInit(): void {
        this.reportService.dateRange.subscribe((value) => {
            this.dateRange = value;

            const format = 'yyyy-MM-dd HH:mm:ss';
            const fromDate = formatDate(this.dateRange[0], format, 'en');
            const toDate = formatDate(this.dateRange[1], format, 'en');

            this.fetchSummaryReport(fromDate, toDate);
        });

    }

    fetchSummaryReport(fromDate: string, toDate: string) {
        const fieldName = 'zone';
        this.reportService.fetchAllSummaryReport(fieldName, fromDate, toDate).subscribe((res) => {
            this.items = res.data;
            this.total = this.items.reduce((acc, val) => acc + val.value, 0);
        });
    }
}
