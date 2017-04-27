import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from "../../taxonomy/category/category";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  public form: FormGroup;
  hierarchyCategories: Category[];

  constructor(private fb: FormBuilder, 
              private db: AngularFireDatabase) { }

  ngOnInit() {
    this.createForm();
    this.getCategories();

    this.form.get('name').valueChanges
      .debounceTime(350)
      .subscribe(name => {
        this.form.get('slug').patchValue(this.createSlug(name))
      });
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      category: null,
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

  createSlug(title: string): string {
    // https://gist.github.com/mathewbyrne/1280286
    return title.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  onSubmit() {
    
    const {slug, name, description, category} = this.form.value;

    const newCategory = {
      slug, 
      name, 
      description, 
      parent: category
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
