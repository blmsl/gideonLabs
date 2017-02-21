import { Component, OnInit } from '@angular/core';
import { WpPost, WpQueryArgs, WpService, ModelResponse } from 'ng2-wp-api';

@Component({
  selector: 'app-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.scss']
})
export class SpecificationsComponent implements OnInit {
  page: WpPost;

  constructor(private wpService: WpService) {
  }

  ngOnInit() {

    let args = new WpQueryArgs({ _embed: true });
    this.wpService.model().pages().get(10, args)
      .subscribe((res) => this.page = new WpPost(res.data));
  }


}
