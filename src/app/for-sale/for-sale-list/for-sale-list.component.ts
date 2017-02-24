import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'for-sale-list',
  styleUrls: ['./for-sale-list.component.scss'],
  template: `
    <h1>For Sale</h1>
    <div class="d-flex justify-content-around">
      <div class="sale-item"
        [routerLink]="[item.slug]"
        routerLinkActive="active"
        *ngFor="let item of items">
        {{ item.title.rendered }}
      </div>
    </div>
  `
})
export class ForSaleListComponent implements OnInit {

  @Input() items: Observable<any>

  constructor() { }

  ngOnInit() {
  }

}
