import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: 'app-story-pictures',
  styleUrls: ['./story-pictures.component.scss'],
  template: `
    <div [formGroup]="parent">
      <h2>Added Pictures</h2>
      <div formArrayName="pictures">
        <div *ngFor="let picture of pictureArray; let i = index;">
          <div [formGroupName]="i">
            <img [src]="picture.value.storageLink" style="width: 150px;">
            <div>Title: {{ picture.value.title }}</div>
            <div>Caption: {{ picture.value.caption }}</div>
            <button 
              type="button" 
              (click)="onRemove(picture, i)">
              Remove Picture
            </button>
          </div>
        </div>
      </div>

    </div>
  `
})
export class StoryPicturesComponent {

  @Input()
  parent: FormGroup;

  @Output()
  removed = new EventEmitter<any>();

  get pictureArray() {
    return (this.parent.get('pictures') as FormArray).controls;
  }

  onRemove(index: number) {
    this.removed.emit(index);
  }

}
