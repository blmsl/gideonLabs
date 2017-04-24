import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';

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
          tabindex="2"
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
            [disabled]="
              form.get('title').invalid || 
              form.get('content').invalid ||
              form.get('pictures').value.length === 0">
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
  
  constructor(private fb: FormBuilder, private db: AngularFireDatabase) { }

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

    // Pull form values out
    let title = this.form.get('title').value;
    let slug = this.createSlug(title);
    let content = this.form.get('content').value;

    let story = {
      title,
      content,
      slug
    };

    this.db.object(`/stories/${slug}`).update(story);
    this.pushPictures(slug);
  }

  // Push each picture reference to database
  pushPictures(titleSlug: string) {
    this.form.get('pictures').value.forEach(picture => {
      this.db.list(`/stories/${titleSlug}/pictures`).push(picture);
    });      
  }


  get _pictures() {
    return this.form.get('pictures') as FormArray;
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
