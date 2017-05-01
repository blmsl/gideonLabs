import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from "../../taxonomy/category/category";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  public form: FormGroup;
  hierarchyCategories: Category[];
  parentControlName = "parent";

  constructor(private fb: FormBuilder, 
              private db: AngularFireDatabase) { }

  ngOnInit() {
    this.createForm();
    this.getCategories();

    this.form.get('name')!.valueChanges
      .debounceTime(350)
      .subscribe(name => {
        this.form.get('slug')!.patchValue(this.createSlug(name));
        this.createLink();
      });

    this.form.get('parent')!.valueChanges
      .subscribe(slug => {
        this.createLink();
      });
  }

  createLink() {
    const baseUrl = 'https://www.gideonlabs.com/posts/category';
    const childSlug = this.form.get('slug')!.value;
    const parentSlug = this.form.get('parent')!.value;
    const link = this.form.get('link')!;

    if (!parentSlug) {
      link.patchValue(`${baseUrl}/${childSlug}`);
    } else {
      const parentCategory = this.hierarchyCategories.find(category => {
        return category.slug === parentSlug;
      });
      const grandParentCategory = this.hierarchyCategories.find(category => {
        return category.slug === parentCategory!.parent;
      });
      if (grandParentCategory) {
        const greatGrandParentCategory = this.hierarchyCategories.find(category => {
          return category.slug === grandParentCategory.parent;
        });
        if (greatGrandParentCategory) {
          link.patchValue(`${baseUrl}/${greatGrandParentCategory.slug}/${grandParentCategory!.slug}/${parentCategory!.slug}/${childSlug}`);
        } else {
          link.patchValue(`${baseUrl}/${grandParentCategory!.slug}/${parentCategory!.slug}/${childSlug}`);
        }
      } else {
        link.patchValue(`${baseUrl}/${parentCategory!.slug}/${childSlug}`);
      }
    }    
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required, [this.validateCategory.bind(this)]],
      parent: '',
      link: ['', Validators.required],
      description: null,
    })
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

  findCategory(category: Category): Observable<boolean> {
    return this.db.object(`/categories/${category}`)
      .map(category => category.$exists());
  }

  validateCategory(control: AbstractControl) {
    return this.findCategory(control.value)
      .first()
      .map((response: boolean) => response ? { categoryExists: true } : null);
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

  get categoryExists() {
    return (
      this.form.get('slug')!.hasError('categoryExists')
    )
  }

  onSubmit() {
        
    const {slug, name, description, parent, link} = this.form.value;

    const newCategory: Category = {
      count: 0,
      description, 
      link,
      name, 
      slug, 
      parent
    }

    this.db.object(`/categories/${slug}`).set(newCategory);
    this.form.reset({
      name: '',
      slug: '',
      category: null,
      description: null,
    });
  }

}
