import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Post } from './post';

@Injectable()
export class PostsService {
  private postsUrl = "https://www.gideonlabs.com/wp-json/wp/v2/posts"

  constructor(private http: Http) {
    
  }

  getPosts(): Observable<Post[]> {
    return this.http.get(this.postsUrl)
      .map((res: Response) => res.json());
  }

  getPost(slug): Observable<Post> {
    return this.http.get(`${this.postsUrl}?slug=${slug}`)
      .map((res: Response) => res.json());
  }
}
