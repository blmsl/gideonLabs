import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-story-info',
  styleUrls: ['./story-info.component.scss'],
  template: `
    <div [formGroup]="parent" class="story-info-container">
      <h2>Add New Post</h2>
      <label for="title">Title</label>
      <input
        id="title"
        formControlName="title"
        type="text" 
        placeholder="Enter title here">
      <label for="slug">Slug</label>
      <input
        id="slug"
        formControlName="slug"
        type="text"
        placeholder="A slug will be generated automatically">
      <div 
        class="error"
        *ngIf="storyExists">
        Story already exists. Please change name or just slug.
      </div>
      <label for="URL">URL</label>
      <input
        id="URL"
        formControlName="link"
        type="text"
        placeholder="This field will be created automatically"
        readonly>
    </div>
  `
})
export class StoryInfoComponent {

  @Input()
  parent: FormGroup;

  get storyExists() {
    return (
      this.parent.get('slug')!.hasError('storyExists')
    )
  }

}
