import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCategoriesComponent } from "./select-categories/select-categories.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectUsersComponent } from './select-users/select-users.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [SelectCategoriesComponent, SelectUsersComponent],
  exports: [SelectCategoriesComponent, SelectUsersComponent]
})
export class AdminSharedModule { }
