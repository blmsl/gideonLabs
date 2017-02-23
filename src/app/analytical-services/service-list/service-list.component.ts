import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'service-list',
  styleUrls: ['./service-list.component.scss'],
  template: `
    <h1>Analytical Services</h1>
    <div class="d-flex flex-wrap justify-content-around">
      <div class="service-item"
        routerLinkActive="active"
        [routerLink]="[service.slug]"
        *ngFor="let service of services">
        {{ service.title.rendered }}
      </div>
    </div>
  `
})
export class ServiceListComponent implements OnInit {

  @Input()
  services: Observable<any>

  constructor() { }

  ngOnInit() {
  }

}
