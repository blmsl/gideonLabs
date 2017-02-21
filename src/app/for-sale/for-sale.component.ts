import { Component, OnInit } from '@angular/core';
import { WpPost, WpQueryArgs, WpService, ModelResponse } from 'ng2-wp-api';

@Component({
  selector: 'app-for-sale',
  templateUrl: './for-sale.component.html',
  styleUrls: ['./for-sale.component.scss']
})
export class ForSaleComponent implements OnInit {
  page: WpPost;

  constructor(private wpService: WpService) { }

  ngOnInit() {
    let args = new WpQueryArgs({ _embed: true });
    this.wpService.model().pages().get(423, args)
      .subscribe((res) => this.page = new WpPost(res.data));
  }

}
