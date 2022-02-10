import { ReportService } from './../../../core/services/report.service';
import { formatDate } from '@angular/common';
import { SummaryReport } from 'src/app/core/interfaces/summary_report';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sum-by-reason',
    templateUrl: './sum-by-reason.component.html',
    styles: [
    ]
})
export class SumByReasonComponent implements OnInit {

    barData: any;
    barOptions: any;
    labels: SummaryReport[];
    datasets: SummaryReport[];
    dateRange: Date[];

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
        const fieldName = 'reason';
        this.reportService.fetchAllSummaryReport(fieldName, fromDate, toDate).subscribe((res) => {
            this.labels = [];
            this.datasets = [];

            for (let value of res.data) {
                this.labels.push(value.name);
                this.datasets.push(value.value);
            }

            this.barChart();
        });
    }

    barChart() {
        this.barData = {
            labels: this.labels,
            datasets: [{
                label: '',
                backgroundColor: ['#64B5F6', '#7986CB', '#4DB6AC', '#CD5C5C', '#FF5733', '#454545'],
                borderColor: 'rgb(255, 99, 132)',
                data: this.datasets,
            }]
        };

        this.barOptions = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: 'rgb(255, 99, 132)'
                    }
                }
            }
        };
    }

}
