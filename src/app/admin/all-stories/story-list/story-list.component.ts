import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../../shared/post';

@Component({
  selector: 'app-story-list',
  styleUrls: ['./story-list.component.scss'],
  template: `
    <div *ngFor="let story of stories" (click)="selectStory(story.$key)">
      {{story.title}}
    </div>
  `
})
export class StoryListComponent {
  @Input() stories: Post[];
  @Output() storyKey: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  selectStory(event: string) {
    this.storyKey.emit(event);
  }
}
