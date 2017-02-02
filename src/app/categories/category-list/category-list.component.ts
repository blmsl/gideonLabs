import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WpQueryArgs, WpEndpoint, WpService, CollectionResponse } from 'ng2-wp-api';

// import { Category } from '../category';
// import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent  {
  categories;
  args;
  pagination;
  collection;

  constructor(private wpService: WpService, private router: Router) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.args = new WpQueryArgs({ per_page: 4});
    this.collection = this.wpService.collection().categories();
    this.collection.get(this.args)
      .subscribe((res: CollectionResponse) => {
        if (res.error) {
          console.error(res.error)
        } else {
          this.pagination = res.pagination;
          this.categories = res.data;
        }
      });
  }

  getNext() {
    this.collection.next()
      .subscribe((res: CollectionResponse) => {
        this.categories = res.data;
        this.pagination = res.pagination;
      })
  }

  getPrevious() {
    if (this.pagination.currentPage > 1) {
      this.collection.prev()
        .subscribe((res: CollectionResponse) => {
          this.categories = res.data;
          this.pagination = res.pagination;
        })
    } else {
      alert('You are on the first page of results!');
    }
  }

  getCategory(slug) {
    this.router.navigate(['posts/category', slug]);
  }

}
