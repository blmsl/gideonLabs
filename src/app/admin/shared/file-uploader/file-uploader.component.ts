import { Component, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {
  dragHighlight: boolean;
  tooManyFiles = false;
   
  @Output()
  file = new EventEmitter<any>();

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

    if (files.length > 1) {
      this.tooManyFiles = true;
      return;
    }
    
    for(let i = 0; i < files.length; i++) {
      let { lastModifiedDate, name, size, type } = files[i];
      let file: any = {
        lastModifiedDate,
        name,
        size,
        type,
        objectURL: ''
      }
      file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
      this.file.emit(file);
    }

    // this.filesToUpload.emit(this.files);
    this.dragHighlight = false;
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
