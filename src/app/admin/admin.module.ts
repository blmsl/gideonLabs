import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import 'firebase/storage';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminSharedModule } from "./shared/admin-shared.module";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AdminSharedModule
  ],
  declarations: [
    AdminComponent, 
    HeaderComponent, 
    SignInComponent, 
    DashboardComponent,
  ]
})
export class AdminModule { }
