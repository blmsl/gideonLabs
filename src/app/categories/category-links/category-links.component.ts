import { Component, Input } from '@angular/core';
import { Category } from '../../shared/category';

@Component({
  selector: 'app-category-links',
  styleUrls: ['./category-links.component.scss'],
  template: `
    <div *ngFor="let category of categories">
      {{space.repeat(category.level)}}<a
        [routerLink]="['']">{{category.name}}</a>
    </div>
  `
})
export class CategoryLinksComponent {
  @Input() categories: Category[];
  space = '\u00A0\u00A0\u00A0';
}
