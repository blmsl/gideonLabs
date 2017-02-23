import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { WpPost, WpQueryArgs, WpService, ModelResponse } from 'ng2-wp-api';

@Component({
  selector: 'app-for-sale',
  styleUrls: ['./for-sale.component.scss'],
  template: `
    <for-sale-list
      (itemPage)="handleGetItem($event)"
      [items]="items$ | async"> 
    </for-sale-list>
    <router-outlet></router-outlet>
  `
})
export class ForSaleComponent implements OnInit {
  page: WpPost;
  items$: Observable<any>;
  args: WpQueryArgs;

  constructor(private wpService: WpService, private router: Router) {
  }

  ngOnInit() {
    this.items$ = this.wpService.link('https://www.gideonlabs.com/wp-json/wp/v2/pages?per_page=30&parent=423');
  }

  handleGetItem(event) {
     this.router.navigate(['for-sale', event])
  }

}
