import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateStoryRoutingModule } from './create-story-routing.module';
import { CreateStoryComponent } from './create-story.component';
import { MdCardModule, MdInputModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { StoryInfoComponent } from './story-info/story-info.component';
import { StoryPicturesComponent } from './story-pictures/story-pictures.component';
import { StoryPictureComponent } from './story-picture/story-picture.component';

import {EditorModule,SharedModule} from 'primeng/primeng';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { TaxonomyModule } from "../taxonomy/taxonomy.module";

@NgModule({
  imports: [
    CommonModule,
    CreateStoryRoutingModule,
    MdCardModule,
    MdInputModule,
    ReactiveFormsModule,
    EditorModule,
    SharedModule,
    AngularFireDatabaseModule,
    TaxonomyModule
  ],
  declarations: [CreateStoryComponent, StoryInfoComponent, StoryPicturesComponent, StoryPictureComponent]
})
export class CreateStoryModule { }
