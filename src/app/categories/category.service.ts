import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {
  private categoriesUrl = "https://www.gideonlabs.com/wp-json/wp/v2/categories"
  constructor(private http: Http) { }
  getCategories() {
    return this.http.get(this.categoriesUrl)
      .map((res: Response) => res.json());
  }

  getCategory(id) {
    return this.http.get(`${this.categoriesUrl}/${id}`)
      .map((res: Response) => res.json());
  }
}
