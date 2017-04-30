import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from "../../taxonomy/category/category";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from "rxjs/Observable";
import { AuthService } from "../../auth/auth.service";
import { Post } from "../../shared/post";

@Component({
  selector: 'app-create-story',
  styleUrls: ['./create-story.component.scss'],
  templateUrl: './create-story.component.html'
})
export class CreateStoryComponent implements OnInit {
  public form: FormGroup;
  hierarchyCategories: Category[];
  
  createForm() {
    let currentDate = new Date();
    let dateString = currentDate.toLocaleDateString();

    let author = this.auth.user.displayName;

    this.form = this.fb.group({
      date: [dateString, Validators.required],
      title: ['', Validators.required],
      slug: ['', Validators.required, [this.validateStory.bind(this)]],
      content: ['', Validators.required],
      category: ['', Validators.required],
      author: [author, Validators.required],
      picture: this.initPicture({}),
      pictures: this.fb.array([])
    })
  }
  
  constructor(private fb: FormBuilder, 
              private db: AngularFireDatabase,
              private auth: AuthService) { }

  ngOnInit() {
    this.createForm();
    this.getCategories();
    this.form.get('title').valueChanges
      .debounceTime(350)
      .subscribe(name => {
        this.form.get('slug').patchValue(this.createSlug(name))
      });
  }

  getCategories() {
    this.db.list('/categories')
      .subscribe(categories => {

        const parents: Category[] = categories.filter(category => {
          if (category.parent === undefined) {
            return true;
          }
        });

        const children: Category[] = categories.filter(category => {
          if (category.parent !== undefined) {
            return true;
          }
        });

        const hierarchy: Category[] = [];

        for (let hierarchyCategory of parents) {
          hierarchy['level'] = 0;
          hierarchy.push(hierarchyCategory);
          for (let child of children) {
            if (child.parent === hierarchyCategory.slug) {
              child['level'] = 1;
              hierarchy.push(child);
              for (let grandChild of children) {
                if (grandChild.parent === child.slug) {
                  grandChild['level'] = 2;
                  hierarchy.push(grandChild);
                } 
              }
            } 
          }
        }

        this.hierarchyCategories = hierarchy;

      });
  }

  findStory(story): Observable<boolean> {
    return this.db.object(`/stories/${story}`)
      .map(story => story.$exists());
  }

  validateStory(control: AbstractControl) {
    return this.findStory(control.value)
      .first()
      .map((response: boolean) => response ? { storyExists: true } : null);
  }

  initPicture(pic) {
    return this.fb.group({
      title: [pic.title || '', Validators.required],
      caption: [pic.caption || '', Validators.required],
      storageLink: [pic.storageLink || '', Validators.required]
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

  addPicture(picture) {
    this._pictures.push(this.initPicture(picture));
  }

  removePicture({picture, index}: {picture: FormGroup, index: number}) {
    this._pictures.removeAt(index);
  }


  onSubmit() {

    // Pull form values out
    // let title = this.form.get('title').value;
    // let slug = this.form.get('slug').value;
    // let content = this.form.get('content').value;
    
    let {date, title, slug, content, category, author} = this.form.value;

    let excerpt = this.generateDescription(content);
    let published = Date.now();
    let created = Date.parse(date);
    let link = `/posts/${slug}`;

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
