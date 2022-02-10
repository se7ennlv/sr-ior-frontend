import { PasswordModel } from './../../../core/models/password.model';
import { ToastService } from './../../../shared/services/toast.service';
import { AuthService } from './../../../core/services/auth.service';
import { UtilsService } from './../../../shared/services/utils.service';
import { RxFormBuilder, ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styles: [
    ]
})
export class ChangePasswordComponent implements OnInit {
    showDialog: boolean = false;

    formGroup: FormGroup;
    submitted: boolean;

    constructor(
        private fb: RxFormBuilder,
        private utilsService: UtilsService,
        private authService: AuthService,
        private toastService: ToastService
    ) {
        ReactiveFormConfig.set(this.utilsService.validationMessages);
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        let model = new PasswordModel();
        this.formGroup = this.fb.formGroup(model);
    }

    changePassword() {
        this.submitted = true;

        if (this.formGroup.invalid) return;

        const formData = this.formGroup.value;
        this.authService.changePassword(formData).subscribe((res) => {
            if (res.status === 'success') {
                this.showDialog = false;
                this.formGroup.reset();
                this.toastService.showToast('success', 'Success', res.message);
            }
        }, (error) => {
            if (error.status === 401) {
                this.toastService.showToast('error', 'Unauthorized', "The current password don't match!");
            } else {
                this.toastService.showToast('error', 'Unauthorized', "Something went wrong");
            }
        });
    };

    resetData() {
        this.submitted = false;
    }

}
