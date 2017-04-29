import { Component, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-story-info',
  styleUrls: ['./story-info.component.scss'],
  template: `
    <div [formGroup]="parent">
      <h2>Add New Post</h2>
      <input
        formControlName="title"
        type="text" 
        placeholder="Enter title here">
      <input
        formControlName="slug"
        type="text"
        placeholder="A slug will be generated automatically">
      <div 
        class="error"
        *ngIf="storyExists">
        Story already exists. Please change name or just slug.
      </div>
    </div>
  `
})
export class StoryInfoComponent {

  @Input()
  parent: FormGroup;

  get storyExists() {
    return (
      this.parent.get('slug').hasError('storyExists')
    )
  }

}
