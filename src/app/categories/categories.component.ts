import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/retry';

import { Category } from '../shared/category';
import { Post } from '../shared/post';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-categories',
  styleUrls: ['./categories.component.scss'],
  template: `
    <app-category-detail [category]="category | async"></app-category-detail>
    <app-story-overview [stories]="stories | async"></app-story-overview>
  `
})
export class CategoriesComponent implements OnInit {
  category: Observable<Category>;
  stories: Observable<Post[]>;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  ngOnInit() {
    this.category = this.route.url
      .map(segment => segment[segment.length - 1].path) // take final segment as category
      .switchMap(category =>
        this.db.list(`/categories`, {
          query: {
            orderByChild: 'slug',
            equalTo: category
          }
        })
      )
      .map(category => category[0])
      .do(category => {
        if (!category) {
          this.router.navigate(['/posts/category']);
        }
      });

    this.stories = this.category
      .map(category => category.$key)
      .switchMap(key => this.db.list(`/categories/${key}/stories`))
      .retry();
  }
}
