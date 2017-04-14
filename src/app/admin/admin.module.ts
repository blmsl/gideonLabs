import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdToolbarModule, MdIconModule, MdButtonModule } from '@angular/material';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
