import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: 'app-story-pictures',
  styleUrls: ['./story-pictures.component.scss'],
  template: `
    <div [formGroup]="parent">
      <ng-content></ng-content>
      <div formArrayName="pictures" class="picture-array-container">
        <div *ngFor="let picture of pictureArray; let i = index;" [formGroupName]="i">
 
            <div class="picture-block">
              <img [src]="picture.value.storageUrl">
              <button
                class="remove-picture"
                type="button" 
                (click)="onRemove(picture, i)">
                X
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
