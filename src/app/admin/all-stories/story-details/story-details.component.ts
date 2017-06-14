import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../shared/post';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements OnInit {
  @Input() story: Post;
  constructor() {}

  ngOnInit() {}
}
