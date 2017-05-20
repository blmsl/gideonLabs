import { Component, Input, Output, EventEmitter } from '@angular/core';
//import { FormGroup, FormArray } from "@angular/forms";
import { FileItem } from "../../shared/file-item";

@Component({
  selector: 'app-story-pictures',
  styleUrls: ['./story-pictures.component.scss'],
  templateUrl: './story-pictures.component.html'
})
export class StoryPicturesComponent {

  // @Input()
  // parent: FormGroup;

  @Input()
  fileList: FileItem[];

  @Output()
  removed = new EventEmitter<number>();

  // get pictureArray() {
  //   return (this.parent.get('pictures') as FormArray).controls;
  // }

  onRemove(index: number) {
    this.removed.emit(index);
  }

}
