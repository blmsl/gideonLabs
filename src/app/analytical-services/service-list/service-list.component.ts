import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'service-list',
  styleUrls: ['./service-list.component.scss'],
  template: `
    <h1>Analytical Services</h1>
    <div class="flex-list">
      <div class="flex-item"
        (click)="getService(service.slug)"
        *ngFor="let service of services">
        {{ service.title.rendered }}
      </div>
    </div>
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
