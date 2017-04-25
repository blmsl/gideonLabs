import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { 
  MdToolbarModule, 
  MdIconModule, 
  MdButtonModule, 
  MdSnackBarModule,
  MdTooltipModule
} from '@angular/material';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdSnackBarModule,
    MdTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent, 
    HeaderComponent, 
    SignInComponent, 
    DashboardComponent,
  ]
})
export class AdminModule { }
