import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceListComponent } from "./service-list/service-list.component";
import { ServiceDetailComponent } from "./service-detail/service-detail.component";
import { AnalyticalServicesComponent } from "./analytical-services.component";

const routes: Routes = [
  { 
    path: '', 
    component: AnalyticalServicesComponent,
    children: [
      { path: ':slug', component: ServiceDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AnalyticalServicesRoutingModule { }
