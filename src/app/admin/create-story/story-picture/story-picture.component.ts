import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods
import { SafeUrl } from "@angular/platform-browser/";

@Component({
  selector: 'app-story-picture',
  styleUrls: ['./story-picture.component.scss'],
  templateUrl: './story-picture.component.html'
})
export class StoryPictureComponent {
  progressValue: number = 0;
  fileUrl: SafeUrl;

  @Input()
  parent: FormGroup;

  @Output()
  added = new EventEmitter<any>();

  @Output()
  pictureReset = new EventEmitter();

  constructor(private fb: FirebaseApp) { }

  // onUploadPicture(event: any) {
  //   let target: HTMLInputElement = event.target as HTMLInputElement;
  //   let files: FileList = target.files;

  //   if (files && files[0]) {
  //     this.upload(files[0]);
  //   }
  // }

  patchFileInfo(file: any) {
    this.fileUrl = file.objectURL;
    this.parent.get('picture')!
      .patchValue({ 
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        type: file.type,
        size: file.size,
        objectURL: file.objectURL
      })
  }

  changeFeatured(event: any) {
    this.parent.get('picture.featured')!.patchValue(event.target.checked);
  }

  upload(file: any) {
    let storageRef = this.fb.storage().ref();
    let slug = this.parent.get('slug')!.value;
    let path = `/stories/${slug}/${file.name}`;
    let picturePath = storageRef.child(path);

    this.parent.get('picture.type')!.patchValue(file.type);

    const metadata: firebase.storage.UploadMetadata = {
      contentType: file.type,
    }

    let pictureTask: firebase.storage.UploadTask = picturePath.put(file, metadata);

    pictureTask
      .on('state_changed',
        (snapshot: any) => this.progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100, 
        error => console.error('There was an error uploading', error),
        // Called on complete
        () => {
          let url = pictureTask.snapshot.downloadURL;
          this.parent.get('picture')!.patchValue({ storageUrl: url });
        }
      );
  }

  onAddPicture() {
    this.added.emit(this.parent.get('picture')!.value);
    this.onResetPicture();
  }

  onResetPicture() {
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
