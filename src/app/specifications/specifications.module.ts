import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificationsRoutingModule } from './specifications-routing.module';
import { SpecificationsComponent } from "./specifications.component";

@NgModule({
  imports: [
    CommonModule,
    SpecificationsRoutingModule
  ],
  declarations: [SpecificationsComponent]
})
export class SpecificationsModule { }
