import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { EditorModule, SharedModule } from 'primeng/primeng';

import { CreateCategoryRoutingModule } from './create-category-routing.module';
import { CreateCategoryComponent } from './create-category.component';
import { AdminSharedModule } from "../shared/admin-shared.module";

@NgModule({
  imports: [
    CommonModule,
    CreateCategoryRoutingModule,
    AngularFireDatabaseModule,
    EditorModule,
    SharedModule,
    ReactiveFormsModule,
    AdminSharedModule
  ],
  declarations: [CreateCategoryComponent]
})
export class CreateCategoryModule { }
