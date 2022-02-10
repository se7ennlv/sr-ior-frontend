import {Component} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
    selector: 'app-rightmenu',
    templateUrl: './menu-right.component.html'
})
export class MenuRightComponent{

    amount: SelectItem[];

    selectedAmount: any;

    constructor(public appService: AppService) {
        this.amount = [
            {label: '*****24', value: {id: 1, name: '*****24', code: 'A1'}},
            {label: '*****75', value: {id: 2, name: '*****75', code: 'A2'}}
        ];
    }
}
