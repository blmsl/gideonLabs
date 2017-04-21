import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-story',
  styleUrls: ['./create-story.component.scss'],
  template: `
    <div>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <app-story-info
          [parent]="form">
        </app-story-info>

        <app-story-picture
          [parent]="form"
          (added)="addPicture($event)">
        </app-story-picture>

        <app-story-pictures
          [parent]="form"
          (removed)="removePicture($event)">
        </app-story-pictures>

        <div>
          <button
            type="submit"
            [disabled]="form.invalid">
            Create Story
          </button>
        </div>

        <pre>{{form.value | json}}</pre>

      </form>
    </div>
  `
})
export class CreateStoryComponent implements OnInit {
  public form: FormGroup;
  
  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      picture: this.initPicture({}),
      pictures: this.fb.array([])
    })
  }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  initPicture(pic) {
    return this.fb.group({
      title: [pic.title || '', Validators.required],
      caption: [pic.caption || '', Validators.required],
      storageLink: [pic.storageLink || '', Validators.required]
    })
  }

  addPicture(picture) {
    this._pictures.push(this.initPicture(picture));
  }

  removePicture({picture, index}: {picture: FormGroup, index: number}) {
    this._pictures.removeAt(index);
  }


  onSubmit() {
    console.log('Submit:', this.form.value);
  }


  get _pictures() {
    return this.form.get('pictures') as FormArray;
  }

}
