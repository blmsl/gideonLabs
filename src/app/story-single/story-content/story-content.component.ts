import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../shared/post';

@Component({
  selector: 'app-story-content',
  templateUrl: './story-content.component.html',
  styleUrls: ['./story-content.component.scss']
})
export class StoryContentComponent implements OnInit {
  @Input() story: Post;

  constructor() {}

  ngOnInit() {}
}
