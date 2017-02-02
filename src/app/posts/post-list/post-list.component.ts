import { Component, OnInit } from '@angular/core';
import { WpQueryArgs, WpEndpoint, WpService, CollectionResponse } from 'ng2-wp-api';
import { Router } from '@angular/router';

// import { Post } from '../post';
// import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  args;
  posts;
  pagination;
  collection;

  constructor(private wpService: WpService, private router: Router) {}

  ngOnInit() {
    this.get();
  }

  get() {
    this.args = new WpQueryArgs({ per_page: 6, _embed: true });
    this.collection = this.wpService.collection().posts();
    this.collection.get(this.args)
      .subscribe((res: CollectionResponse) => {
        if (res.error) {
          console.error(res.error)
        } else {
          this.pagination = res.pagination;
          this.posts = res.data;
        }
      });
    console.log('got the posts!');
  }

  getNext() {
    console.log('Getting next page');
    this.collection.next()
      .subscribe((res: CollectionResponse) => {
        this.posts = res.data;
        this.pagination = res.pagination;
      })
  }

  getPrevious() {
    console.log('Getting previous page');
    if (this.pagination.currentPage > 1) {
      this.collection.prev()
        .subscribe((res: CollectionResponse) => {
          this.posts = res.data;
          this.pagination = res.pagination;
        })
    } else {
      alert('You are on the first page of results!');
    }
  }

  getPost(slug) {
    this.router.navigate(['posts', slug]);
  }
}




