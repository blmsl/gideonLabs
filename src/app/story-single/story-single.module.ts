import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorySingleRoutingModule } from './story-single-routing.module';
import { StoryComponent } from './story/story.component';
import { StoryContentComponent } from './story-content/story-content.component';
import { StoryPicturesComponent } from './story-pictures/story-pictures.component';

@NgModule({
  imports: [
    CommonModule,
    StorySingleRoutingModule
  ],
  declarations: [StoryComponent, StoryContentComponent, StoryPicturesComponent]
})
export class StorySingleModule { }
