import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods
import { SafeUrl } from "@angular/platform-browser/";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-story-picture',
  styleUrls: ['./story-picture.component.scss'],
  templateUrl: './story-picture.component.html'
})
export class StoryPictureComponent {
  progressValue: number = 0;
  fileUrl: SafeUrl;
  file: File;

  @Input()
  parent: FormGroup;

  @Output()
  added = new EventEmitter<any>();

  @Output()
  pictureReset = new EventEmitter();

  @Output()
  rawFile = new EventEmitter<File>();

  constructor(private sanitizer: DomSanitizer) { }

  get pictureExists(): boolean {
    return (
      this.parent.get('picture.slug')!.hasError('pictureExists')
    )
  }

  patchFileInfo(file: File): void {
    const objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
    const [fileName, fileType] = file.name.split('.');
    this.fileUrl = objectURL;
    this.parent.get('picture')!
      .patchValue({ 
        file: {
          lastModifiedDate: file.lastModifiedDate,
          name: file.name,
          size: file.size,
          type: file.type,
          webkitRelativePath: file.webkitRelativePath
        }, 
        objectURL,
        title: fileName
      });

    this.file = file;
  }

  changeFeatured(event: any): void {
    this.parent.get('picture.featured')!.patchValue(event.target.checked);
  }

  onAddPicture(): void {
    const picture = this.parent.get('picture')!.value;
    this.added.emit(picture);
    this.rawFile.emit(this.file)
  }

  onResetPicture(): void {
    this.pictureReset.emit();
    this.progressValue = 0;
  }

  createSlug(title: string): string {
    // https://gist.github.com/mathewbyrne/1280286
    return title.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

}
