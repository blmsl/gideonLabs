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
        <p-editor
          formControlName="content"
          placeholder="Story">
          <p-header>
            <span class="ql-formats">
              <button class="ql-bold" type="button" type="button"></button>
              <button class="ql-italic" type="button"></button>
              <button class="ql-underline" type="button"></button>
            </span>
            <span class="ql-formats">
              <button class="ql-script" value="sub" type="button"></button>
              <button class="ql-script" value="super" type="button"></button>
            </span>
            <span class="ql-formats">
              <button class="ql-header" value="2" type="button"></button>
              <button class="ql-list" value="ordered" type="button"></button>
              <button class="ql-list" value="bullet" type="button"></button>
            </span>
            <span class="ql-formats">
              <button class="ql-link" type="button"></button>
            </span>
          </p-header>
        </p-editor>
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
