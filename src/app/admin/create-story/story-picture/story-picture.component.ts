import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-story-picture',
  styleUrls: ['./story-picture.component.scss'],
  template: `
    <div [formGroup]="parent">

      <div formGroupName="picture">
        <input 
          type="text" 
          placeholder="Title" 
          formControlName="title">
        <input 
          type="text" 
          placeholder="Caption" 
          formControlName="caption">
        <input 
          type="text" 
          placeholder="Storage Link" 
          formControlName="storageLink"
          readonly>
        <button
          type="button"
          (click)="onAddPicture()">
          Add Picture
        </button>
      </div>

    </div>
  `
})
export class StoryPictureComponent {

  @Input()
  parent: FormGroup;

  @Output()
  added = new EventEmitter<any>();

  onAddPicture() {
    this.added.emit(this.parent.get('picture').value);
  }

}
