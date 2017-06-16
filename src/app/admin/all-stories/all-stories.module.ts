import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStoriesRoutingModule } from './all-stories-routing.module';
import { AllStoriesComponent } from './all-stories.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { PicturesComponent } from './pictures/pictures.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  imports: [CommonModule, AllStoriesRoutingModule],
  declarations: [AllStoriesComponent, StoryListComponent, StoryDetailsComponent, PicturesComponent, UserInfoComponent]
})
export class AllStoriesModule {}
