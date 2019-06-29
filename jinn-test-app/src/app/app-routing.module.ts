import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JinnSchedulingComponent } from './jinn-scheduling/jinn-scheduling.component';

const routes: Routes = [
  {
    path: "",
    component: JinnSchedulingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
