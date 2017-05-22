import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCategoriesComponent } from "./select-categories/select-categories.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectUsersComponent } from './select-users/select-users.component';
import { CheckboxCategoriesComponent } from './checkbox-categories/checkbox-categories.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    SelectCategoriesComponent, 
    SelectUsersComponent, 
    CheckboxCategoriesComponent, 
    FileUploaderComponent],
  exports: [
    SelectCategoriesComponent,
    SelectUsersComponent,
    CheckboxCategoriesComponent,
    FileUploaderComponent]
})
export class AdminSharedModule { }
