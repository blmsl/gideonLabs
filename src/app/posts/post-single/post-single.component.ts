import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WpPost, WpQueryArgs, WpService } from 'ng2-wp-api';

// import { PostsService } from '../posts.service';
// import { Post } from '../post';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent implements OnInit {
  slug: string;
  // post: Post;
  post;
  constructor(private route: ActivatedRoute, 
              private wpService: WpService) {
    route.params.subscribe((param: any) => this.slug = param['slug']);
    console.log(this.slug);
  }

  // getPost(slug) {
  //   this.postsService.getPost(slug)
  //     .subscribe(res => this.post = res[0]);
  // }

  ngOnInit() {
    let args = new WpQueryArgs({
      _embed: true
    });
    this.wpService.model().posts().get(this.slug, args)
      .subscribe(res => {
        if (res.error) {
          console.log(res.error)
        } else {
          this.post = new WpPost(res.data);
        }
      })
  }



}
