import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { FileItem } from "../file-item";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  dragHighlight: boolean;
  public files: FileItem[] = [];
  thumbnailWidth = 100;
   
  @Output()
  filesToUpload = new EventEmitter<FileItem[]>();

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
      let { lastModifiedDate, name, size, type } = files[i];
      let file: FileItem = {
        lastModifiedDate,
        name,
        size,
        type,
        objectURL: ''
      }
      file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
      this.files.push(file);
    }

    this.filesToUpload.emit(this.files);
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
