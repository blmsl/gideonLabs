import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Category } from "../../taxonomy/category/category";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/do";
import { TaxonomyService } from "../../taxonomy/taxonomy.service";

@Component({
  selector: 'app-create-story',
  styleUrls: ['./create-story.component.scss'],
  templateUrl: './create-story.component.html'
})
export class CreateStoryComponent implements OnInit {
  public form: FormGroup;
  categories: FirebaseListObservable<Category[]>;
  parentCategories: Category[];

  categoryHierarchy: Category[];
  
  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      picture: this.initPicture({}),
      pictures: this.fb.array([])
    })
  }
  
  constructor(private fb: FormBuilder, 
              private db: AngularFireDatabase, 
              private taxonomy: TaxonomyService) { }

  ngOnInit() {
    this.createForm();
    this.getCategories();
  }

  getCategories() {
    this.db.list('/categories')
      .subscribe(categories => {

        for (let category of categories) {
          let children: Category[] = [];

          for (let catList of categories) {
            if (catList.parent === category.slug) {
              children.push(catList);
            }
          }
          category['children'] = [...children];
        }

        this.parentCategories = categories;
      })
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
    let description = this.generateDescription(content);

    let story = {
      title,
      content,
      slug,
      description
    };

    this.db.object(`/stories/${slug}`).update(story);
    this.pushPictures(slug);
    this.form.reset();
  }

  // Push each picture reference to database
  pushPictures(titleSlug: string) {
    this.form.get('pictures').value.forEach(picture => {
      picture.slug = this.createSlug(picture.title);
      this.db.object(`/stories/${titleSlug}/pictures/${picture.slug}`).set(picture);
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

  generateDescription(content: string): string {
    // First strip HTML from string,
    // cf. http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
    // Second, limit the string 155 characters breaking on spaces
    // cf. http://stackoverflow.com/questions/5454235/javascript-shorten-string-without-cutting-words
    return content.replace(/<(?:.|\n)*?>/gm, '').replace(/^(.{155}[^\s]*).*/, "$1");
  }

}
