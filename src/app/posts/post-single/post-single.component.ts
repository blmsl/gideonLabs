import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent implements OnInit {
  slug: string;
  post: Post;
  constructor(private postsService: PostsService, private route: ActivatedRoute) {
    route.params.subscribe((param: any) => this.slug = param['slug']);
    console.log(this.slug);
  }

  getPost(slug) {
    this.postsService.getPost(slug)
      .subscribe(res => this.post = res[0]);
  }

  ngOnInit() {
    this.getPost(this.slug);
  }



}
