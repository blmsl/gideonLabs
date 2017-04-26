import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from "./category/category";

@Injectable()
export class TaxonomyService {

  _categories: Category[];

  constructor(private db: AngularFireDatabase) {
    this.retrieveCategories();
  }

  get categories(): Category[] {
    return this._categories;
  }

  set categories(categories: Category[]) {
    this._categories = categories;
  }

  retrieveCategories(): void {
    
  }

}
