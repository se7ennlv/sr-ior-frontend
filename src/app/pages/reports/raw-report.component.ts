import { environment } from './../../../environments/environment.prod';
import { ReportService } from './../../core/services/report.service';
import { RecordItem } from './../../core/interfaces/record_item';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { formatDate } from '@angular/common';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
    selector: 'app-raw-report',
    templateUrl: './raw-report.component.html',
    styleUrls: ['./style.scss']
})
export class RawReportComponent implements OnInit {
    cols: any[];
    excelData: any[];

    items: RecordItem[];
    item: RecordItem;
    baseUrl: String;
    loading: boolean = true;

    now = new Date();
    dateRange: Date[];
    yearRange: string;
    currentDate = formatDate(this.now, 'yyyy-MM-dd', 'en');
    currentYear: number = this.now.getFullYear();

    constructor(
        private breadcrumbService: BreadcrumbService,
        private reportService: ReportService
    ) {
        this.breadcrumbService.setItems([
            { label: 'Raw Data' }
        ]);
        this.baseUrl = environment.ENDPOINT;

        this.yearRange = `2021:${this.currentYear}`;
        this.dateRange = [
            new Date(`${this.currentDate} 06:00:00`),
            new Date(`${this.currentDate} 20:00:00`)
        ];
    }

    ngOnInit() {
        this.fetchData(this.dateRange);
        this.initColumns();
    }

    initColumns() {
        this.cols = [
            { field: 'employee.fname', header: 'First Name' },
            { field: 'employee.lname', header: 'Last Name' },
            { field: 'employee.dept_name', header: 'Department' },
            { field: 'number_plate', header: 'Number Plate' },
            { field: 'reason', header: 'Reason' },
            { field: 'record_date', header: 'Record Date' },
            { field: 'record_time', header: 'Record Time' },
            { field: 'zone', header: 'Zone' }
        ];
    }

    fetchData(date: Date[]) {
        const format = 'yyyy-MM-dd HH:mm:ss';
        const _fromDate = formatDate(date[0], format, 'en');
        const _toDate = formatDate(date[1], format, 'en');

        this.loading = true;

        this.reportService.fetchAllRecords(_fromDate, _toDate).subscribe((res) => {
            this.items = res.data;
            this.loading = false;
        });
    }

    search() {
        if (this.dateRange) {
            this.fetchData(this.dateRange);
        }
    }

}
