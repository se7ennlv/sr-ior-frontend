import { IoRecordComponent } from './pages/io-record.component';
import { MainComponent } from './pages/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
          { path: '', component: IoRecordComponent },
        ]
      },
      { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordingRoutingModule { }
