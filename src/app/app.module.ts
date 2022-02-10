import { ChangePasswordComponent } from './pages/authentication/components/change-password.component';
import { ExportingService } from './shared/services/exporting.service';
import { SumByZoneComponent } from './pages/dashboard/components/sum-by-zone.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './pages/authentication/login.component';
import { BreadcrumbService } from './shared/services/breadcrumb.service';
import { MenuService } from './shared/services/menu.service';
import { MainComponent } from './pages/main.component';
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from './app.component';
import { AppConfigComponent } from './core/config/app.config.component';
import { AppMenuitemComponent } from './shared/directives/menuitem.component';
import { AppSearchComponent } from './core/components/search.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';


import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { FooterComponent } from './core/components/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuRightComponent } from './core/components/menu-right.component';
import { TopBarComponent } from './core/components/topbar.component';
import { MenuLeftComponent } from './core/components/menu-left.component';
import { SumByDeptComponent } from './pages/dashboard/components/sum-by-dept.component';
import { SumByReasonComponent } from './pages/dashboard/components/sum-by-reason.component';
import { RecordListComponent } from './pages/dashboard/components/record-list.component';
import { DateSelectionComponent } from './pages/dashboard/components/date-selection.component';
import { RawReportComponent } from './pages/reports/raw-report.component';
import { CheckpointComponent } from './pages/authentication/components/checkpoint.component';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
]);


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        NgxWebstorageModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        MainComponent,
        MenuLeftComponent,
        MenuRightComponent,
        AppMenuitemComponent,
        AppConfigComponent,
        TopBarComponent,
        AppSearchComponent,
        FooterComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        LoginComponent,
        DashboardComponent,
        SumByZoneComponent,
        SumByDeptComponent,
        SumByReasonComponent,
        RecordListComponent,
        DateSelectionComponent,
        RawReportComponent,
        ChangePasswordComponent,
        CheckpointComponent,
    ],
    providers: [
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        MenuService, MessageService, BreadcrumbService, ExportingService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
