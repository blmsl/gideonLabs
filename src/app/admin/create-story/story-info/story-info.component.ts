import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-story-info',
  styleUrls: ['./story-info.component.scss'],
  template: `
    <div [formGroup]="parent">

      <div>
        <input
          formControlName="title"
          type="text" 
          placeholder="Title">
        <input
          formControlName="content"
          type="text" 
          placeholder="Story">
      </div>

    </div>
  `
})
export class StoryInfoComponent implements OnInit {

  @Input()
  parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
