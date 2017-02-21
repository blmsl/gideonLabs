import { Component, OnInit } from '@angular/core';
import { WpPost, WpQueryArgs, WpService, ModelResponse } from 'ng2-wp-api';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  page: WpPost;

  constructor(private wpService: WpService) {
  }

  ngOnInit() {

    let args = new WpQueryArgs({ _embed: true });
    this.wpService.model().pages().get(198, args)
      .subscribe((res) => this.page = new WpPost(res.data));
  }

}
