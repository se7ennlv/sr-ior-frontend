import { RawReportComponent } from './pages/reports/raw-report.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { LoginComponent } from './pages/authentication/login.component';
import { MainComponent } from './pages/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '', canActivate: [AuthGuard], component: MainComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'reports', component: RawReportComponent },
            // { path: 'uikit/floatlabel', component: FloatLabelDemoComponent },
        ]
    },
    { path: 'recording', loadChildren: () => import('./modules/recording/recording.module').then(m => m.RecordingModule) },
    { path: 'error', component: AppErrorComponent },
    { path: 'access', component: AppAccessdeniedComponent },
    { path: 'notfound', component: AppNotfoundComponent },
    { path: 'auth', component: LoginComponent },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
