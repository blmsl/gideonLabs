import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import { Category } from '../shared/category';
import { Post } from '../shared/post';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  category: Observable<Category>;
  stories: Observable<Post[]>;
  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {}

  ngOnInit() {
    this.category = this.route.url
      .map(segment => segment[segment.length - 1].path) // take final segment as category
      // .do(segment => console.log(segment))
      .switchMap(category =>
        this.db.list(`/categories`, {
          query: {
            orderByChild: 'slug',
            equalTo: category
          }
        })
      )
      .map(category => category[0])
      .do(category => console.log(category));

    this.category.pluck('stories').subscribe(stories => console.log(stories));
  }
}
