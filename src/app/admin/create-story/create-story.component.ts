import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from "../../taxonomy/category/category";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from "rxjs/Observable";
import { AuthService } from "../../auth/auth.service";
import { Post } from "../../shared/post";
import { User } from "../shared/user";
import { Picture } from "../../shared/picture";

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
  asyncTest: boolean = false;
  author: string;
  
  
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
      category: ['', Validators.required],
      author: [this.auth.user.uid, Validators.required],
      picture: this.initPicture({}),
      pictures: this.fb.array([]),
      link: ['', Validators.required]
    })
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
    this.asyncTest = true;
    return this.findStory(control.value)
      .first()
      .map((response: boolean) => {
        this.asyncTest = false;
        return response ? { storyExists: true } : null;
      });
  }

  initPicture(pic: any) {
    const date = Date.now();
    return this.fb.group({
      date: [pic.date || date, Validators.required],
      slug: [pic.slug || ''],
      title: [pic.title || '', Validators.required],
      author: [pic.author || this.auth.user.uid, Validators.required],
      caption: [pic.caption || '', Validators.required],
      altText: [pic.altText || '', Validators.required],
      type: [pic.type || ''],
      storageUrl: [pic.storageUrl || '', Validators.required],
    })
  }

  // getParentStructure() {
  //   //Parent based array where children categories are properties of parents
  //   const children = [...this.testChildren];
  //   const parentCats = [...this.testParents];
    
  //   for (let parentCategory of parentCats) {
  //     const kids = [];
  //     for (let child of children) {
  //       let grandChildren: Category[] = [];
  //       if (child.parent === parentCategory.slug) {
  //         kids.push(child);
  //         for (let kid of children) {
  //           if (kid.parent === child.slug) {
  //             grandChildren.push(kid);
  //           }
  //         }
  //       }
  //       child['children'] = grandChildren;
  //     }
  //     parentCategory['children'] = kids;
  //   }
  // }

  addPicture(picture: Picture) {
    picture.slug = this.createSlug(picture.title);
    this._pictures.push(this.initPicture(picture));
    this.resetPicture();
  }

  removePicture(index: number) {
    this._pictures.removeAt(index);
  }

  formReset() {
    let currentDate = new Date();
    let dateString = currentDate.toLocaleDateString();

    this.form.reset({
      title: '',
      slug: '',
      date: dateString,      
      author: this.auth.user.uid,
      picture: {
        date: Date.now(),
        author: this.auth.user.uid,
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
      storageUrl: ''
    });
  }

  resetPictureArray() {
    this._pictures.value.forEach(picture => this._pictures.removeAt(0));
  }

  onSubmit() {   
    let {date, title, slug, content, category, author, link} = this.form.value;

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
      author,
      category
    };

    // this.db.object(`/stories/${slug}`).update(story);
    // this.pushPictures(slug);
  }

  // Push each picture reference to database
  pushPictures(titleSlug: string) {
    this.form.get('pictures')!.value.forEach((picture: Picture) => {
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
