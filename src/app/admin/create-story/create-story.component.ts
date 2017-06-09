import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
// import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/auth.service';
import { Category } from '../../taxonomy/category/category';
import { Post } from '../../shared/post';
import { User } from '../shared/user';
import { FirebaseStorageService } from '../../services/firebase-storage.service';

@Component({
  selector: 'app-create-story',
  styleUrls: ['./create-story.component.scss'],
  templateUrl: './create-story.component.html'
})
export class CreateStoryComponent implements OnInit {
  public form: FormGroup;
  hierarchyCategories: Category[];
  users: User[];
  categoryControlName = 'category';
  author: string;
  addingPicture: boolean = false;
  uploading = false;
  filesToUpload: File[] = [];
  emptyPicture = {
    date: '',
    file: {
      lastModifiedDate: '',
      name: '',
      size: '',
      type: '',
      webkitRelativePath: ''
    },
    slug: '',
    title: '',
    author: this.auth.user.uid,
    caption: '',
    altText: '',
    featured: false,
    objectURL: ''
  };

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private auth: AuthService,
    private fbApp: FirebaseApp,
    private fbStorage: FirebaseStorageService
  ) {}

  ngOnInit() {
    this.createForm();
    this.getCategories();
    this.getUsers();

    this.form.get('title')!.valueChanges.subscribe(name => {
      this.form.get('slug')!.patchValue(this.createSlug(name));
    });

    this.form.get('slug')!.valueChanges.subscribe(slug => {
      this.form.get('link')!.patchValue(
        `https://www.gideonlabs.com/posts/${slug}`
      );
    });

    this.form.get('picture.title')!.valueChanges.subscribe(title => {
      this.form.get('picture.caption')!.patchValue(title);
      this.form.get('picture.altText')!.patchValue(title);
      this.form.get('picture.slug')!.patchValue(this.createSlug(title));
    });

    this.author = this.auth.user.uid;
  }

  createForm() {
    let currentDate = new Date();
    let dateString = currentDate.toLocaleDateString();

    this.form = this.fb.group({
      date: [dateString, Validators.required],
      title: ['', Validators.required],
      slug: [
        '',
        [Validators.required, Validators.pattern(/^[0-9A-Za-z\s\-]+$/)],
        [this.validateStory.bind(this)]
      ],
      content: ['', Validators.required],
      categories: [[]],
      featuredImage: [null, Validators.required],
      author: [this.auth.user.uid, Validators.required],
      picture: this.initPicture(this.emptyPicture),
      pictures: this.fb.array([]),
      link: ['', Validators.required]
    });
  }

  initPicture(pic: any) {
    return this.fb.group({
      date: Date.now(),
      file: this.fb.group({
        lastModifiedDate: [pic.file.lastModifiedDate || ''],
        name: [pic.file.name || ''],
        size: [pic.file.size || ''],
        type: [pic.file.type || ''],
        webkitRelativePath: [pic.file.webkitRelativePath || '']
      }),
      slug: [
        pic.slug || '',
        [Validators.required],
        [this.validatePicture.bind(this)]
      ],
      title: [pic.title || '', Validators.required],
      author: [pic.author || this.auth.user.uid, Validators.required],
      caption: [pic.caption || '', Validators.required],
      altText: [pic.altText || '', Validators.required],
      featured: [pic.featured || false],
      objectURL: [pic.objectURL || '', Validators.required]
    });
  }

  toggleAddPicture() {
    this.addingPicture = !this.addingPicture;
  }

  getUsers() {
    this.db.list('/users').subscribe(users => (this.users = users));
  }

  getCategories() {
    this.db.list('/categories').subscribe(categories => {
      const parents: Category[] = categories.filter(category => {
        if (category.parent === undefined) {
          return true;
        }
        return;
      });

      const children: Category[] = categories.filter(category => {
        if (category.parent !== undefined) {
          return true;
        }
        return;
      });

      const hierarchy: Category[] = [];

      for (let hierarchyCategory of parents) {
        hierarchyCategory.level = 0;
        hierarchy.push(hierarchyCategory);
        for (let child of children) {
          if (child.parent === hierarchyCategory.slug) {
            child.level = 1;
            hierarchy.push(child);
            for (let grandChild of children) {
              if (grandChild.parent === child.slug) {
                grandChild.level = 2;
                hierarchy.push(grandChild);
              }
            }
          }
        }
      }

      this.hierarchyCategories = hierarchy;
    });
  }

  findPicture(picture: string): Observable<boolean> {
    return this.db
      .list(`/pictures`, {
        query: {
          orderByChild: 'slug',
          equalTo: picture
        }
      })
      .map(pictures => pictures.length);
  }

  validatePicture(control: AbstractControl) {
    return this.findPicture(control.value).first().map((response: boolean) => {
      return response ? { pictureExists: true } : null;
    });
  }

  findStory(story: string): Observable<boolean> {
    return this.db.object(`/stories/${story}`).map(story => {
      return story.$exists();
    });
  }

  validateStory(control: AbstractControl) {
    return this.findStory(control.value).first().map((response: boolean) => {
      return response ? { storyExists: true } : null;
    });
  }

  addPicture(picture: any) {
    if (picture.featured) {
      this.form.get('featuredImage')!.patchValue(picture.objectURL);
    }
    this._pictures.push(this.initPicture(picture));
    this.resetPicture();
    this.addingPicture = false;
  }

  removePicture(index: number) {
    if (this._pictures.value[index].featured) {
      this.form.get('featuredImage')!.patchValue(null);
    }
    this._pictures.removeAt(index);
    this.filesToUpload.splice(index, 1);
  }

  formReset() {
    let currentDate = new Date();
    let dateString = currentDate.toLocaleDateString();

    this.form.reset({
      title: '',
      slug: '',
      date: dateString,
      author: this.auth.user.uid,
      categories: [],
      picture: {
        date: Date.now(),
        title: '',
        author: this.auth.user.uid,
        featured: false,
        objectURL: ''
      }
    });
    this.resetPictureArray();
  }

  resetPicture() {
    this.form.get('picture')!.reset({
      date: Date.now(),
      slug: '',
      title: '',
      author: this.auth.user.uid,
      caption: '',
      altText: '',
      type: '',
      featured: false,
      objectURL: ''
    });
  }

  resetPictureArray() {
    this._pictures.value.forEach((picture: any) => this._pictures.removeAt(0));
    this.filesToUpload.length = 0;
  }

  addFileToUploads(file: File) {
    this.filesToUpload.push(file);
  }

  async onSubmit() {
    let {
      date,
      title,
      slug,
      content,
      categories,
      author,
      link
    } = this.form.value;

    let excerpt = this.generateDescription(content);
    let published = Date.now();
    let created = Date.parse(date);

    const story: Post = {
      published,
      created,
      slug,
      link,
      title,
      content,
      excerpt,
      author
    };

    const { key: storyKey } = await this.db.list(`/stories`).push(story);

    this.uploading = true;

    // Try for async file uploading:
    // https://stackoverflow.com/questions/18983138/callback-after-all-asynchronous-foreach-callbacks-are-completed

    for (let file of this.filesToUpload) {
      let index = this.filesToUpload.indexOf(file);
      const picture = {
        ...this._pictures.value[index],
        file: null,
        objectURL: null
      };
      // let { altText, author, caption, featured, slug, title } = picture;
      // const pictureDetails = {
      //   altText,
      //   author,
      //   caption,
      //   featured,
      //   slug,
      //   title
      // };
      const fileType = file.name.split('.')[1];

      // Push new picture to /pictures
      const { key: pictureKey } = await this.db.list('/pictures').push(picture);

      // Add picture details to /storyPicture
      await this.db
        .object(`/storyPictures/${storyKey}/${pictureKey}`)
        .set(picture);

      const filePath = `/stories/${storyKey}/${pictureKey}/${picture.slug}.${fileType}`;
      const snapshot = await this.fbApp.storage().ref(filePath).put(file);
      const fullPath = snapshot.metadata.fullPath;
      const imageUrl = this.fbApp.storage().ref(fullPath).toString();

      const storageURL = await this.fbStorage.getDownloadURL(imageUrl);
      // if (picture.featured) {
      //   this.db
      //     .object(`/stories/${storyRef.key}/featuredImage`)
      //     .set(picture.slug);
      // }
      this.db.object(`/pictures/${pictureKey}/original`).update({ storageURL });
      this.db
        .object(`/storyPictures/${storyKey}/${pictureKey}/original`)
        .update({ storageURL });
    }

    this.uploading = false;

    if (categories.length > 0) {
      this.pushCategoriesToStory(storyKey, categories);
      this.pushStoryToCategories(story, storyKey, categories);
    }

    this.formReset();
  }

  pushCategoriesToStory(key: string, categories: string[]) {
    let categoryList: any = {};
    categories.forEach(category => (categoryList[category] = true));
    this.db.object(`/stories/${key}/categories`).set(categoryList);
  }

  pushStoryToCategories(story: Post, storyKey: string, categories: string[]) {
    let { slug, title, excerpt } = story;
    const storySynopsis = { slug, title, excerpt };

    categories.forEach(categoryKey => {
      this.db
        .object(`/categories/${categoryKey}/stories/${storyKey}`)
        .set(storySynopsis);
    });
  }

  get _pictures() {
    return this.form.get('pictures') as FormArray;
  }

  createSlug(title: string): string {
    // https://gist.github.com/mathewbyrne/1280286
    return title
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  generateDescription(content: string): string {
    // First strip HTML from string,
    // cf. http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
    // Second, limit the string 155 characters breaking on spaces
    // cf. http://stackoverflow.com/questions/5454235/javascript-shorten-string-without-cutting-words
    return content
      .replace(/<(?:.|\n)*?>/gm, '')
      .replace(/^(.{155}[^\s]*).*/, '$1');
  }

  categorySelection(event: any) {
    const categories = this.form.get('categories')!.value as Array<string>;

    if (event.checked) {
      // if a box just got checked
      // check if it's already in the array
      if (!categories.includes(event.value)) {
        categories.push(event.value);
      }
    } else {
      const index = categories.indexOf(event.value);
      categories.splice(index, 1);
    }
  }
}
