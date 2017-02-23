import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WpService, ModelResponse } from 'ng2-wp-api';
import { Page } from '../../shared/page';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'service-detail',
  styleUrls: ['./service-detail.component.scss'],
  template: `
    <h1>{{ servicePage?.title.rendered }}</h1>
    <div [innerHTML]="servicePage?.content.rendered"></div>
  `
})
export class ServiceDetailComponent implements OnInit {
  servicePage: Page;

  constructor(
    private wpService: WpService,
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .switchMap((data) => {
        return this.wpService
          .link(`https://www.gideonlabs.com/wp-json/wp/v2/pages?slug=${data.slug}`);
      })
      .concatMap(res => res)
      .subscribe((page: Page) => this.servicePage = page);
  }

}
