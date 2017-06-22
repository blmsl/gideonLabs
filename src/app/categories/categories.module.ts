import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from './categoryDetail/category-detail.component';
import { StoryOverviewComponent } from './storyOverview/story-overview.component';

@NgModule({
  imports: [CommonModule, CategoriesRoutingModule],
  declarations: [CategoriesComponent, CategoryDetailComponent, StoryOverviewComponent]
})
export class CategoriesModule {}
