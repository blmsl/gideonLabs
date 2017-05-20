import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from "rxjs/Observable";

import { AuthService } from "../../auth/auth.service";
import { Category } from "../../taxonomy/category/category";
import { Post } from "../../shared/post";
import { User } from "../shared/user";
import { Picture } from "../../shared/picture";
import { FileItem } from "../shared/file-item";

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
  fileList: FileItem[]; 
  
  constructor(private fb: FormBuilder, 
              private db: AngularFireDatabase,
              private auth: AuthService) { }

  ngOnInit() {
    this.createForm();
    this.getCategories();
    this.getUsers();
    this.form.get('title')!.valueChanges
      .subscribe(name => {
        let slug = this.createSlug(name);
        this.form.get('slug')!.patchValue(slug);
      });

    this.form.get('slug')!.valueChanges
      .subscribe(slug => {
        this.form.get('link')!.patchValue(`https://www.gideonlabs.com/posts/${slug}`);
      });

    this.author = this.auth.user.uid;
    
  }

  createForm() {
    let currentDate = new Date();
    let dateString = currentDate.toLocaleDateString();

    this.form = this.fb.group({
      date: [dateString, Validators.required],
      title: ['', Validators.required],
      slug: ['', [Validators.required, Validators.pattern(/^[0-9A-Za-z\s\-]+$/)], [this.validateStory.bind(this)]],
      content: ['', Validators.required],
      categories: [[]],
      featuredImage: [null, Validators.required],
      author: [this.auth.user.uid, Validators.required],
      pictures: this.fb.array([]),
      link: ['', Validators.required]
    })
  }

  initPicture(pic: any) {
    const date = Date.now();
    return this.fb.group({
      date: [pic.date || date, Validators.required],
      slug: [pic.name || ''],
      title: [pic.name || '', Validators.required],
      author: [pic.author || this.auth.user.uid, Validators.required],
      //caption: [pic.caption || '', Validators.required],
      //altText: [pic.altText || '', Validators.required],
      type: [pic.type || ''],
      size: [pic.size || ''],
      featured: [pic.featured || false],
      objectURL: [pic.objectURL || '']
    })
  }

  filesToUpload(files: FileItem[]) {
    this.fileList = files;
  }

  addPicture(picture: Picture) {
    picture.slug = this.createSlug(picture.title);
    this._pictures.push(this.initPicture(picture));
    this.resetPicture();
    this.addingPicture = false;
  }

  removePicture(index: number) {
    this.fileList.splice(index, 1);
  }

  toggleAddPicture() {
    this.addingPicture = !this.addingPicture;
  }
  
  getUsers() {
    this.db.list('/users')
      .subscribe(users => this.users = users)
  }

  getCategories() {
    this.db.list('/categories')
      .subscribe(categories => {

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

  findStory(story: any): Observable<boolean> {
    return this.db.object(`/stories/${story}`)
      .map(story => {
        return story.$exists();
      });
  }

  validateStory(control: AbstractControl) {
    return this.findStory(control.value)
      .first()
      .map((response: boolean) => {
        return response ? { storyExists: true } : null;
      });
  }

  

  formReset() {
    let currentDate = new Date();
    let dateString = currentDate.toLocaleDateString();

    this.form.reset({
      title: '',
      slug: '',
      date: dateString,      
      author: this.auth.user.uid,
      category: '',
      picture: {
        date: Date.now(),
        author: this.auth.user.uid,
        featured: false,
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
      storageUrl: ''
    });
  }


  resetPictureArray() {
    this._pictures.value.forEach((picture: any) => this._pictures.removeAt(0));
  }

  onSubmit() {   
    let {date, title, slug, content, categories, author, link, pictures, featuredImage} = this.form.value;

    let excerpt = this.generateDescription(content);
    let published = Date.now();
    let created = Date.parse(date);

    const story: Post = {
      featuredImage,
      published,
      created,
      slug,
      link,
      title,
      content,
      excerpt,
      author
    };

    this.db.object(`/stories/${slug}`).update(story).then(() => {
      this.pushPictures(slug, pictures);
      this.pushCategories(slug, categories);
      this.pushCategoryStories(story, categories);
    }).catch(err => console.log(err));
    
    this.formReset();
  }

  // Push each picture reference to database
  pushPictures(titleSlug: string, pictures: Picture[]) {
    pictures.forEach((picture: Picture) => {
      this.db.object(`/stories/${titleSlug}/pictures/${picture.slug}`).set(picture);
    });      
  }

  pushCategories(title: string, categories: string[]) {
    let categoryList: any = {};
    categories.forEach(category => categoryList[category] = true);
    this.db.object(`/stories/${title}/categories`).set(categoryList);
  }

  pushCategoryStories(story: Post, categories: string[]) {
    categories.forEach(category => {
      let { slug, title, excerpt, featuredImage } = story;
      const storySynopsis = { slug, title, excerpt, featuredImage };
      this.db.list(`/categories/${category}/stories`).push(storySynopsis);
    })
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

  categorySelection(event: any) {

    const categories = this.form.get('categories')!.value as Array<string>;

    if (event.checked) { // if a box just got checked
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
