import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

import { EditorModule, SharedModule } from 'primeng/primeng';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    EditorModule,
    SharedModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule {}
