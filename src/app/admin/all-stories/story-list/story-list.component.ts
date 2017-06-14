import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../shared/post';

@Component({
  selector: 'app-story-list',
  styleUrls: ['./story-list.component.scss'],
  template: `
    <div *ngFor="let story of stories">
      {{story.title}}
    </div>
  `
})
export class StoryListComponent implements OnInit {
  @Input() stories: Post[];
  constructor() {}

  ngOnInit() {}
}
