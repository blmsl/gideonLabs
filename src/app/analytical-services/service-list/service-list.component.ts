import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'service-list',
  styleUrls: ['./service-list.component.scss'],
  template: `
    <ul>
      <li 
        (click)="getService(service.slug)"
        *ngFor="let service of services">
        {{ service.title.rendered }}
      </li>
    </ul>
  `
})
export class ServiceListComponent implements OnInit {

  @Input()
  services: Observable<any>

  @Output()
  servicePage: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getService(event: string) {
    this.servicePage.emit(event);
  }

}
