import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../shared/post';

@Component({
  selector: 'app-story-overview',
  styleUrls: ['./story-overview.component.scss'],
  template: `
    <div *ngIf="stories">
      <div *ngFor="let story of stories">
        <h2><a [routerLink]="['/posts', story.slug]">{{story.title}}</a></h2>
        <div [innerHTML]="story.excerpt"></div>
        <img [src]="story.thumbnail.storageURL">
      </div>
    </div>
  `
})
export class StoryOverviewComponent implements OnInit {
  @Input() stories: Post[];
  constructor() {}

  ngOnInit() {}
}
