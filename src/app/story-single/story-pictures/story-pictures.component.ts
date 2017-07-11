import { Component, OnInit, Input } from '@angular/core';
import { Picture } from '../../shared/picture';

@Component({
  selector: 'app-story-pictures',
  templateUrl: './story-pictures.component.html',
  styleUrls: ['./story-pictures.component.scss']
})
export class StoryPicturesComponent implements OnInit {
  @Input() pictures: Picture[];
  constructor() {}

  ngOnInit() {}
}
