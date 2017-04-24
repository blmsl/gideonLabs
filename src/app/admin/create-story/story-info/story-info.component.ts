import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-story-info',
  styleUrls: ['./story-info.component.scss'],
  template: `
    <div [formGroup]="parent">
      <h2>Story Title</h2>
      <input
        formControlName="title"
        type="text" 
        placeholder="Title">
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
