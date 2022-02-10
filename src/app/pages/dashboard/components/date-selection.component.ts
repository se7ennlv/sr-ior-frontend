import { ReportService } from './../../../core/services/report.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-date-selection',
    templateUrl: './date-selection.component.html',
    styles: [
    ]
})
export class DateSelectionComponent implements OnInit {

    dateRange: Date[];
    currentYear: number = new Date().getFullYear();
    yearRange: string;

    now = new Date();
    currentDate = formatDate(this.now, 'yyyy-MM-dd', 'en');

    constructor(private reportService: ReportService) {
        this.dateRange = [
            new Date(`${this.currentDate} 06:00:00`),
            new Date(`${this.currentDate} 20:00:00`)
        ];
        this.reportService.changeDate(this.dateRange);
    }

    ngOnInit(): void {
        this.yearRange = `2021:${this.currentYear}`;
    }

    search() {
        if (this.dateRange) {
            this.reportService.changeDate(this.dateRange);
        }
    }

}
