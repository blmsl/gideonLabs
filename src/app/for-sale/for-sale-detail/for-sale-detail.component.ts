import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WpService, ModelResponse } from 'ng2-wp-api';

@Component({
  selector: 'app-for-sale-detail',
  styleUrls: ['./for-sale-detail.component.scss'],
  template: `
    <h1>{{ itemPage?.title.rendered }}</h1>
    <div [innerHTML]="itemPage?.content.rendered"></div>
  `
})
export class ForSaleDetailComponent implements OnInit {
  itemPage: any;

  constructor(
    private wpService: WpService,
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .switchMap((data: any) => {
        return this.wpService
          .link(`https://www.gideonlabs.com/wp-json/wp/v2/pages?slug=${data.slug}`);
      })
      .concatMap(res => res)
      .subscribe(page => this.itemPage = page);
  }
}
