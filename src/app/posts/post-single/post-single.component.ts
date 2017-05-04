import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpPost, WpService, CollectionResponse } from 'ng2-wp-api';

// import { Post } from '../post';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent implements OnInit {
  
  slug: string;
  post: WpPost;

  constructor(private route: ActivatedRoute, private wpService: WpService) {
    route.params.subscribe((param: any) => this.slug = param['slug']);
  }

  ngOnInit() {

    this.wpService.collection().posts().get({ slug: this.slug })
      .subscribe((res: CollectionResponse) => {
        if (res.error) {
          console.log(res.error)
        } else {
          this.post = new WpPost(res.data[0]);
        }
      });

    this.route.url.subscribe(url => {
      let lastPath = url.length - 1;
      console.log(url[lastPath].path);
    });
  }

}
