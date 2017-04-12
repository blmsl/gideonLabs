import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from "./contact.component";

import {EditorModule,SharedModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    EditorModule,
    SharedModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
