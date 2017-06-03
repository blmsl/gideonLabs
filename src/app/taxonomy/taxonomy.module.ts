import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category/category-list.component';
import { TagComponent } from './tag/tag.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CategoryListComponent, TagComponent],
  exports: [CategoryListComponent]
})
export class TaxonomyModule {}
