import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import { Post } from '../../shared/post';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-all-stories',
  styleUrls: ['./all-stories.component.scss'],
  template: `
    <div class="story-container">
      <app-story-list 
        [stories]="stories | async" 
        (storyKey)="selectStory($event)"></app-story-list>
      <app-story-details [story]="story | async"></app-story-details>
    </div>
  `
})
export class AllStoriesComponent implements OnInit {
  stories: FirebaseListObservable<Post[]>;
  story: FirebaseObjectObservable<Post>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.stories = this.db.list('/stories');
  }

  selectStory(key: string) {
    console.log(key);
    this.story = this.db.object(`/stories/${key}`);
  }
}
