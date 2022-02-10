import { SharedModule } from './../../shared/shared.module';
import { MenuRightComponent } from './components/layout/menu-right.component';
import { FooterComponent } from './components/layout/footer.component';
import { MenuLeftComponent } from './components/layout/menu-left.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordingRoutingModule } from './recording-routing.module';
import { MainComponent } from './pages/main.component';
import { IoRecordComponent } from './pages/io-record.component';


@NgModule({
    declarations: [
        MainComponent,
        MenuLeftComponent,
        MenuRightComponent,
        FooterComponent,
        IoRecordComponent
    ],
    imports: [
        CommonModule,
        RecordingRoutingModule,
        SharedModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecordingModule { }
