import { Component, Input, Output, EventEmitter } from '@angular/core';
//import { FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: 'app-story-pictures',
  styleUrls: ['./story-pictures.component.scss'],
  templateUrl: './story-pictures.component.html'
})
export class StoryPicturesComponent {

  // @Input()
  // parent: FormGroup;

  @Input()
  fileList: File[];

  @Output()
  removed = new EventEmitter<any>();

  // get pictureArray() {
  //   return (this.parent.get('pictures') as FormArray).controls;
  // }

  onRemove(index: number) {
    this.removed.emit(index);
  }

}
