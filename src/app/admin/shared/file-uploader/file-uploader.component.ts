import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  form: FormGroup;
  dragHighlight: boolean;
  public files: File[] = [];
  thumbnailWidth = 150;
  pi: number = 3.141592;
  e: number = 2.718281828459045;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      file: ''
    }) 
  }

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

  onSubmit() {
    console.log(this.form.value);
  }

}
