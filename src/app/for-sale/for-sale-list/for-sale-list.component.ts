import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'for-sale-list',
  styleUrls: ['./for-sale-list.component.css'],
  template: `
    <ul>
      <li 
        (click)="getItem(item.slug)"
        *ngFor="let item of items">
        {{ item.title.rendered }}
      </li>
    </ul>
  `
})
export class ForSaleListComponent implements OnInit {

  @Input() items: Observable<any>

  @Output() itemPage: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getItem(event: string) {
    this.itemPage.emit(event);
  }

}
