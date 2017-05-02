import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-story-picture',
  styleUrls: ['./story-picture.component.scss'],
  templateUrl: './story-picture.component.html'
})
export class StoryPictureComponent {
  progressValue: number = 0;

  @Input()
  parent: FormGroup;

  @Output()
  added = new EventEmitter<any>();

  onUploadPicture(event: any) {
    let target: HTMLInputElement = <HTMLInputElement> event.target;
    let files: FileList = target.files;

    if (files && files[0]) {
      this.upload(files[0]);
    }
  }

  upload(file: any) {
    let storageRef = firebase.storage().ref();
    let slug = this.createSlug(this.parent.get('title')!.value);
    let path = `/stories/${slug}/${file.name}`;
    let picturePath = storageRef.child(path);

    const metadata: firebase.storage.UploadMetadata = {
      contentType: file.type,
      customMetadata: {
        title: this.parent.get(['picture', 'title'])!.value,
        caption: this.parent.get(['picture', 'caption'])!.value
      }
    }

    let pictureTask = picturePath.put(file, metadata);

    pictureTask
      .on('state_changed',
        (snapshot: any) => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progressValue = percentage;
        }, 
        // Called on errors
        error => {
          console.error('There was an error uploading', error)
        },
        // Called on complete
        () => {
          let url = pictureTask.snapshot.downloadURL;
          this.parent.get('picture')!.patchValue({ storageLink: url });
        }
      );
  }

  onAddPicture() {
    this.added.emit(this.parent.get('picture')!.value);
    this.onResetPicture();
  }

  onResetPicture() {
    this.parent.get('picture')!.reset({
      title: '',
      caption: '',
      storageUrl: '',
      link: ''
    });
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
