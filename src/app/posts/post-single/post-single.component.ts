import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WpPost, WpQueryArgs, WpService, CollectionResponse } from 'ng2-wp-api';

import { PostsService } from '../posts.service';
// import { Post } from '../post';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent implements OnInit {
  
  slug: string;
  post;

  constructor(private route: ActivatedRoute, private wpService: WpService) {
    route.params.subscribe((param: any) => this.slug = param['slug']);
  }

  ngOnInit() {
    
    let args = new WpQueryArgs({
      _embed: true
    });

    this.wpService.collection().posts().get({ slug: this.slug })
      .subscribe((res: CollectionResponse) => {
        if (res.error) {
          console.log(res.error)
        } else {
          this.post = new WpPost(res.data[0]);
        }
      });

  }



}
