import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  dragHighlight: boolean;
  public files: File[] = [];
  thumbnailWidth = 100;
  
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
  
  @Output()
  filesToUpload = new EventEmitter<File[]>();

  constructor(private sanitizer: DomSanitizer) { }

  get isAdvancedUpload() {
    const div = document.createElement('div');
    return (
      (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) 
      && 'FormData' in window 
      && 'FileReader' in window
    )
  }

  onDrop(event: DragEvent) {
    this.preventAndStop(event);
    let files = event.dataTransfer.files;
    
    for(let i = 0; i < files.length; i++) {
      let file: any = files[i];
      file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
      this.files.push(files[i]);
    }

    this.filesToUpload.emit(this.files);
  }

  onDragover(event: DragEvent) {
    this.dragHighlight = true;
    this.preventAndStop(event);
  }

  onDragenter(event: DragEvent) {
    this.preventAndStop(event);
  }

  onDragleave(event: DragEvent) {
    this.dragHighlight = false;
    this.preventAndStop(event);
  }

  preventAndStop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

}
