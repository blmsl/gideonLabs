import { Component, OnInit } from '@angular/core';
import { WpPost, WpQueryArgs, WpService, ModelResponse } from 'ng2-wp-api';

@Component({
  selector: 'app-analytical-services',
  templateUrl: './analytical-services.component.html',
  styleUrls: ['./analytical-services.component.scss']
})
export class AnalyticalServicesComponent implements OnInit {
  page: WpPost;

  constructor(private wpService: WpService) {
  }

  ngOnInit() {

    let args = new WpQueryArgs({ _embed: true });
    this.wpService.model().pages().get(65, args)
      .subscribe((res) => this.page = new WpPost(res.data));
  }

}
