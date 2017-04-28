import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Category } from "../../../taxonomy/category/category";

@Component({
  selector: 'app-select-categories',
  styleUrls: ['./select-categories.component.scss'],
  template: `
    <div [formGroup]="parent">

      <select
        formControlName="category">
        <option value="">Select Category</option>
        <option
          *ngFor="let parent of categories" 
          [value]="parent.slug">
          {{space.repeat(parent.level)}}{{parent.name}}
        </option>
      </select>

      

    </div>
  `
})
export class SelectCategoriesComponent {
  @Input()
  parent: FormGroup;

  @Input()
  categories: Category[];

  space = "\u00A0\u00A0\u00A0";
  

}

// <optgroup label="Old Testament">
//   <option *ngFor="let book of books.old" [value]="book">{{book}}</option>
// </optgroup>

// <div *ngFor="let parent of categories" class="category-list">
//   <ul *ngIf="parent.parent === undefined" class="category-list__top-level">
//     <li>{{parent.name}}
//       <ul *ngIf="parent.children.length > 0">
//         <li *ngFor="let child of parent.children">{{child.name}}
//           <ul *ngIf="child.children.length > 0">
//             <li *ngFor="let grandChild of child.children">{{grandChild.name}}
//             </li>
//           </ul>
//         </li>
//       </ul>
//     </li>
//   </ul>
// </div>