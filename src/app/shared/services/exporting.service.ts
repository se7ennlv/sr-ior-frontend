import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
let EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExportingService {

    constructor() { }

    public exportAsExcelFile(jsonData: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const currentTime = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });

        FileSaver.saveAs(data, fileName +'_'+ currentTime + EXCEL_EXTENSION);
    }

}
