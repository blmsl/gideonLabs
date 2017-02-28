import { Component, OnInit } from '@angular/core';
import { WpPost, WpQueryArgs, WpService, ModelResponse } from 'ng2-wp-api';

@Component({
  selector: 'app-history',
  styleUrls: ['./history.component.scss'],
  template: `
  <div *ngIf="page">
    <div [innerHTML]="page.content()"></div>
  </div>
  <div *ngIf="!page">
    <p>no page found</p>
  </div>
  `
})
export class HistoryComponent implements OnInit {
  page: WpPost;

  constructor(private wpService: WpService) {
  }

  ngOnInit() {
    let args = new WpQueryArgs({ _embed: true });
    this.wpService.model().pages().get(7, args)
      .subscribe((res) => this.page = new WpPost(res.data));
  }

}
