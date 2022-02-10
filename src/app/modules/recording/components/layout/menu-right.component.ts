import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
    selector: 'app-rightmenu',
    templateUrl: './menu-right.component.html'
})
export class MenuRightComponent implements OnInit {

    zones: SelectItem[];
    selectedZone: any;

    constructor(
        public appService: AppService,
        private storage: LocalStorageService
    ) {
        this.zones = [
            { label: 'Select Zone', value: { id: 1, name: '', code: '' } },
            { label: 'IN', value: { id: 2, name: 'IN', code: 'IN' } },
            { label: 'OUT', value: { id: 3, name: 'OUT', code: 'OUT' } }
        ];
    }

    ngOnInit() {
        this.initZone();
    }

    initZone() {
        const getZone = this.storage.retrieve('zone');
        this.selectedZone = getZone;
    }

    changeZone(event) {
        this.selectedZone = event.value;
    }

    saveZone() {
        this.storage.store('zone', this.selectedZone);
    }
}
