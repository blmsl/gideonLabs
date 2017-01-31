import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[];
  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  getPost(slug) {
    this.router.navigate(['posts', slug]);
  }

}
