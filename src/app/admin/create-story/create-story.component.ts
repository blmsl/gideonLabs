import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-story',
  styleUrls: ['./create-story.component.scss'],
  template: `
    <div class="create-story-container">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <app-story-info
          [parent]="form">
        </app-story-info>

        <p-editor
          [style]="{'height': '25em'}"
          formControlName="content"
          placeholder="Story">
          <p-header>
            <span class="ql-formats">
              <button class="ql-bold" type="button" type="button"></button>
              <button class="ql-italic" type="button"></button>
              <button class="ql-underline" type="button"></button>
            </span>
            <span class="ql-formats">
              <button class="ql-script" value="sub" type="button"></button>
              <button class="ql-script" value="super" type="button"></button>
            </span>
            <span class="ql-formats">
              <button class="ql-header" value="2" type="button"></button>
              <button class="ql-list" value="ordered" type="button"></button>
              <button class="ql-list" value="bullet" type="button"></button>
            </span>
            <span class="ql-formats">
              <button class="ql-link" type="button"></button>
            </span>
          </p-header>
        </p-editor>

        <app-story-picture
          [parent]="form"
          (added)="addPicture($event)">
        </app-story-picture>

        <app-story-pictures
          [parent]="form"
          (removed)="removePicture($event)">
        </app-story-pictures>

        <div class="submit-button">
          <button
            type="submit"
            [disabled]="form.invalid">
            Create Story
          </button>
        </div>

<pre class="form-value">
{{form.value | json}}
</pre>

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
