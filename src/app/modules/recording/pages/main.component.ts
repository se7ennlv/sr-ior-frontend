import { AppService } from './../../../shared/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: []
})
export class MainComponent implements OnInit {

    constructor(public appService: AppService) { }

    ngOnInit(): void {
        this.appService.menuMode = 'overlay';
    }

}
