import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecificationsComponent } from "./specifications.component";

const routes: Routes = [
  {
    path: '', component: SpecificationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SpecificationsRoutingModule { }
