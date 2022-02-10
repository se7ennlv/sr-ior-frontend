import { JwtService } from './../../core/services/jwt.service';
import { AccountModel } from './../../core/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder, ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../core/services/auth.service';
import { AccountService } from '../../shared/services/account.service';
import { ToastService } from '../../shared/services/toast.service';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    appVersion;
    appUpdated;
    formGroup: FormGroup;
    submitted: boolean;

    constructor(
        private fb: RxFormBuilder,
        private authService: AuthService,
        private accountService: AccountService,
        private utilsService: UtilsService,
        private toastService: ToastService,
        private jwtService: JwtService,
        public app: AppComponent
    ) {
        this.appVersion = environment.VERSION;
        this.appUpdated = environment.UPDATED;
        ReactiveFormConfig.set(this.utilsService.validationMessages);
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        let model = new AccountModel();
        this.formGroup = this.fb.formGroup(model);
    }

    login() {
        this.submitted = true;

        if (this.formGroup.invalid) {
            return false;
        }

        const formData = this.formGroup.value;
        this.authService.login(formData).subscribe((token) => {
            if (token) {
                const _token = token?.access_token;
                this.jwtService.setToken(_token);
                this.accountService.getProfile(_token);
            }
        }, (error) => {
            const errorMessage = error.error.message;
            this.toastService.showToast('error', 'Unauthorized', errorMessage);
        });
    }

}
