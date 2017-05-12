import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Category } from "../../../taxonomy/category/category";

@Component({
  selector: 'app-checkbox-categories',
  styleUrls: ['./checkbox-categories.component.scss'],
  template: `
    <h2>Categories</h2>
    <div class="category-checkbox-list">
      <div *ngFor="let parentCat of categories">
        {{space.repeat(parentCat.level)}}<input
          [id]="parentCat.slug"
          [value]="parentCat.slug"
          (change)="onCheckChange($event)"
          type="checkbox">
        <label for="{{parentCat.slug}}">{{parentCat.name}}</label>
      </div>
    </div>
  `
})
export class CheckboxCategoriesComponent implements OnInit {
  @Input()
  parent: FormGroup;

  @Input()
  categories: Category[];

  @Input()
  controlName: string;

  @Output()
  checkedCategory: EventEmitter<string> = new EventEmitter();

  space = "\u00A0\u00A0\u00A0";

  onCheckChange(event: any) {
    this.checkedCategory.emit(event.target);
  }

  
  constructor() { }

  ngOnInit() {
  }

}
