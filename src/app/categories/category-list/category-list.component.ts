import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/category';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-category-list',
  styleUrls: ['./category-list.component.scss'],
  template: `
  <app-category-links 
    [categories]="hierarchyCategories">
    </app-category-links>
  `
})
export class CategoryListComponent implements OnInit {
  hierarchyCategories: Category[];
  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.db.list('/categories').subscribe(categories => {
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
}
