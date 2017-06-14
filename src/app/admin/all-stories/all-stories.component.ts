import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable
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
      <app-story-list [stories]="stories | async"></app-story-list>
      <app-story-details [story]="stories | async"></app-story-details>
    </div>
  `
})
export class AllStoriesComponent implements OnInit {
  stories: FirebaseListObservable<Post[]>;
  titles: any;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.db
      .list('/stories')
      // .switchMap(story => story)
      .map(story => story.title)
      .subscribe(story => console.log(story));
  }
}
