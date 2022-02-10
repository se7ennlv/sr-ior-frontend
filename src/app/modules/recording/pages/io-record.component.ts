import { EmployeeService } from './../services/employee.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AppService } from 'src/app/shared/services/app.service';
import { RecordItem } from '../interfaces/record_item';
import { formatDate } from '@angular/common';
import { IoService } from './../services/io.service';
import { RxFormBuilder, ReactiveFormConfig, RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Item } from '../interfaces/record_item';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { environment } from 'src/environments/environment.prod';
import { Employee } from 'src/app/shared/interfaces/employee';

@Component({
    selector: 'app-io-record',
    templateUrl: './io-record.component.html',
    styleUrls: ['./io-record.component.scss']
})
export class IoRecordComponent implements OnInit, AfterViewInit {
    @ViewChild("inputBox") inutBox: ElementRef;

    emp: Employee;
    displayModal: boolean;
    submitted: boolean;
    ioForm: FormGroup;
    zone: String;
    reason: String;
    baseUrl: String;
    photoSrc: String;

    currentDateTime;
    heading: string;
    atTime: String;

    // numpad: number;
    // numpadSettings: MbscNumpadDecimalOptions = {
    //     theme: 'ios',
    //     themeVariant: 'light',
    //     entryMode: 'freeform',
    //     display: 'bubble',
    //     touchUi: true,
    //     min: 200001,
    //     max: 999999,
    //     defaultValue: 0,
    //     thousandsSeparator: '',
    //     setText: 'Enter',
    //     leftKey: {
    //         text: '000',
    //         value: '000'
    //     },
    //     rightKey: {
    //         text: '0000',
    //         value: '0000'
    //     },
    //     onSet: (event, inst) => {
    //         this.enteredValue(event.valueText);
    //     },
    //     onClose: (event, inst) => {
    //         this.resetData();
    //         inst.clear();
    //     }
    // };

    constructor(
        private fb: RxFormBuilder,
        private toastService: ToastService,
        private utilsService: UtilsService,
        private ioService: IoService,
        private empService: EmployeeService,
        private storage: LocalStorageService,
        public appService: AppService
    ) {
        ReactiveFormConfig.set(this.utilsService.validationMessages);
        this.baseUrl = environment.ENDPOINT;
    }

    ngOnInit() {
        this.initForm();
        this.initZone();
    }

    ngAfterViewInit() {
        this.dateTimeHeading();
    }

    dateTimeHeading() {
        setInterval(() => {
            const format = 'dd MMM, yyyy HH:mm:ss';
            this.currentDateTime = new Date();
            this.heading = `${formatDate(this.currentDateTime, format, 'en')}`;
        }, 1000);
    }

    initZone() {
        const getZone = this.storage.retrieve('zone');
        this.zone = getZone?.name;

        if (!this.zone) {
            this.displayModal = true;
        }

        this.storage.observe('zone').subscribe((value) => {
            this.zone = value?.code;
        });
    }

    initForm() {
        this.ioForm = this.fb.group({
            emp_id: ['', RxwebValidators.required()],
            zone: ['', RxwebValidators.required()],
            reason: ['', RxwebValidators.required()]
        });
    }

    dataEntry(value) {
        const regex = /\d+/g;
        const filteredValue = value.match(regex);

        if (filteredValue) {
            let empId = filteredValue[0];

            if (empId.length == 6) {
                this.getEmpInfo(empId);

                this.ioForm.patchValue({
                    emp_id: empId,
                    zone: this.zone
                });
            }
        }
    }

    getEmpInfo(id: any) {
        this.empService.getOneEmp(id).subscribe((res) => {
            if (res.status === 'success') {
                this.emp = res.data;

                if (this.emp) {
                    var d = new Date();
                    this.atTime = d.toLocaleTimeString();
                    const photo = this.emp?.photo;

                    if (photo) {
                        this.photoSrc = `${this.baseUrl}/images/employees/${photo}`;
                    }
                } else {
                    this.resetData();
                    this.toastService.showToast('error', 'Alert', 'No data found.');
                }
            }
        });
    }

    createDoc() {
        if (this.reason) {
            const formData = this.ioForm.value;
            this.ioService.create(formData).subscribe((res) => {
                if (res.status == 'success') {
                    this.toastService.showToast(res.status, 'Success', res.message);
                    this.resetData();
                } else {
                    this.toastService.showToast(res.status, 'Error', res.message);
                }
            });
        } else  {
            this.toastService.showToast('error', 'Alert', 'Please select the reason before submit');
        }
    }

    selectReason(reason: String) {
        const empId = this.emp?.emp_id;

        if (!empId) {
            this.toastService.showToast('error', 'Alert', 'Please enter employee info');
        } else {
            this.reason = reason;
            this.submitted = true;

            this.ioForm.patchValue({
                reason: this.reason
            });
        }
    }

    resetData() {
        this.submitted = false;
        this.ioForm.reset();
        this.photoSrc = 'assets/images/notfound.png';
        this.reason = '';
        this.inutBox.nativeElement.focus();
        this.emp = null;
    }

}
