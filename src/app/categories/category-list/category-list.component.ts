import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent  {
  categories: Category[];
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

}
