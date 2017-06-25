import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/category';
import { UrlSegment } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  styleUrls: ['./category-detail.component.scss'],
  template: `
    <div class="breadcrumbs">
      <a routerLink="/posts/category">All Categories</a>
    </div>
    <div *ngIf="category">
      <h1>{{category.name}}</h1>
      <div *ngIf="category.count === 0">
        There are no stories associated with this category.
      </div>
      <div *ngIf="category.description">
        <p [innerHTML]="category.description"></p>
      </div>
    </div>
  `
})
export class CategoryDetailComponent implements OnInit {
  @Input() category: Category;

  constructor() {}

  ngOnInit() {}
}
