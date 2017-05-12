import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: 'app-story-pictures',
  styleUrls: ['./story-pictures.component.scss'],
  template: `
    <h2>Added Pictures</h2>
    <div [formGroup]="parent">
      <ng-content></ng-content>
      <div formArrayName="pictures" class="picture-array-container">
        <div
          *ngFor="let picture of pictureArray; let i = index;"
          [formGroupName]="i">
 
            <div class="picture-block" [ngClass]="{featured: picture.value.featured}">
              <img [src]="picture.value.storageUrl">
              <button
                class="remove-picture"
                type="button" 
                (click)="onRemove(i)">
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
