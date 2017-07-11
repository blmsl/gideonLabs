import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import { Post } from '../../shared/post';
import { Picture } from '../../shared/picture';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/user';

@Component({
  selector: 'app-all-stories',
  styleUrls: ['./all-stories.component.scss'],
  template: `
    <div class="story-container">
      <app-story-list 
        [stories]="stories | async" 
        (storyKey)="selectStory($event)"></app-story-list>
      <app-story-details [story]="story | async"></app-story-details>
      <app-pictures [pictures]="pictures | async"></app-pictures>
    </div>
  `
})
export class AllStoriesComponent implements OnInit {
  stories: FirebaseListObservable<Post[]>;
  story: FirebaseObjectObservable<Post>;
  pictures: FirebaseListObservable<Picture[]>;
  author: Observable<User>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.stories = this.db.list('/stories');
  }

  selectStory(key: string) {
    this.story = this.db.object(`/stories/${key}`);
    this.pictures = this.db.list(`/storyPictures/${key}`);
    this.author = this.story
      .map(story => story.author)
      .switchMap(author => this.db.object(`/users/${author}`));
  }
}
