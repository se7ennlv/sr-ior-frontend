import { environment } from 'src/environments/environment.prod';

import { Component } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    appVersion: String;
    appUpdate: String;

    constructor(public appService: AppService) {
        this.appVersion = environment.VERSION;
        this.appUpdate = environment.UPDATED;
    }
}
