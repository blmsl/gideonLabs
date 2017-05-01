import { Component, Input } from '@angular/core';
import { FirebaseListObservable } from "angularfire2/database";
import { Category } from "./category";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  @Input()
  categories: FirebaseListObservable<Category[]>;

}
