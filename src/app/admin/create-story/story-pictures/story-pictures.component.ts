import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FileItem } from "../../shared/file-item";

@Component({
  selector: 'app-story-pictures',
  styleUrls: ['./story-pictures.component.scss'],
  templateUrl: './story-pictures.component.html'
})
export class StoryPicturesComponent {

  @Input()
  parent: FormGroup;

  @Input()
  fileList: FileItem[];

  @Output()
  removed = new EventEmitter<number>();

  @Output()
  edit = new EventEmitter<number>();

  onRemove(index: number) {
    this.removed.emit(index);
  }

  onEdit(index: number) {
    this.edit.emit(index);
  }

}
