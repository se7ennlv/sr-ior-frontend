import { ReportService } from './../../../core/services/report.service';
import { formatDate } from '@angular/common';
import { SummaryReport } from 'src/app/core/interfaces/summary_report';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sum-by-dept',
    templateUrl: './sum-by-dept.component.html',
    styles: [
    ]
})
export class SumByDeptComponent implements OnInit {
    items: SummaryReport[];
    dateRange: Date[];
    total: number;

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

    fetchSummaryReport(fromDate: Date | string, toDate: Date | string) {
        const fieldName = 'dept_name';
        this.reportService.fetchAllSummaryReport(fieldName, fromDate, toDate).subscribe((res) => {
            this.items = res.data;
            this.total = this.items.reduce((acc, val) => acc + val.value, 0);
        });
    }

}
