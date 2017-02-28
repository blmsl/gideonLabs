import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticalServicesRoutingModule } from './analytical-services-routing.module';
import { AnalyticalServicesComponent } from "./analytical-services.component";
import { ServiceListComponent } from "./service-list/service-list.component";
import { ServiceDetailComponent } from "./service-detail/service-detail.component";

@NgModule({
  imports: [
    CommonModule,
    AnalyticalServicesRoutingModule
  ],
  declarations: [
    AnalyticalServicesComponent,
    ServiceListComponent,
    ServiceDetailComponent
  ]
})
export class AnalyticalServicesModule { }
