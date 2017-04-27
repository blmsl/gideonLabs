import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCategoriesComponent } from "./select-categories/select-categories.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [SelectCategoriesComponent],
  exports: [SelectCategoriesComponent]
})
export class AdminSharedModule { }
