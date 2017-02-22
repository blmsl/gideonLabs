import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WpPost, WpQueryArgs, WpService, ModelResponse, CollectionResponse } from 'ng2-wp-api';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-analytical-services',
  styleUrls: ['./analytical-services.component.scss'],
  template: `
    <service-list
      (servicePage)="handleGetService($event)"
      [services]="services$ | async"> 
    </service-list>
    <router-outlet></router-outlet>
  `
})
export class AnalyticalServicesComponent implements OnInit {
  page: WpPost;
  services$: Observable<any>;
  args: WpQueryArgs;

  constructor(private wpService: WpService, private router: Router) {
  }

  ngOnInit() {
    this.args = new WpQueryArgs({
      per_page: 30
    });
    this.services$ = this.wpService.link('https://www.gideonlabs.com/wp-json/wp/v2/pages?per_page=30&parent=65');
  }

  handleGetService(event) {
     this.router.navigate(['analytical-services', event])
  }
}
