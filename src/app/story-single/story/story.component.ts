import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../shared/post';
import { Picture } from '../../shared/picture';

@Component({
  selector: 'app-story',
  styleUrls: ['./story.component.scss'],
  template: `
    <div class="story">
      <app-story-content
        [story]="story | async">
      </app-story-content>
      <app-story-pictures
        [pictures]="pictures | async">
      </app-story-pictures>
    </div>
  `
})
export class StoryComponent implements OnInit {
  slug: string;
  story: Observable<Post>;
  pictures: Observable<Picture[]>;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {}

  async ngOnInit() {
    this.story = await this.route.params
      .map((params: Params) => params['slug'])
      .switchMap((slug: string) => {
        return this.db.list('/stories', {
          query: {
            orderByChild: 'slug',
            equalTo: slug
          }
        });
      })
      .map(data => data[0]);

    this.pictures = this.story.pluck('$key').switchMap((key: string) => {
      return this.db.list(`/storyPictures/${key}`);
    });
  }
}
