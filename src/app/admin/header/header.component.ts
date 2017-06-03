import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() authenticated: boolean;
  @Input() userInfo: firebase.UserInfo;
  @Output() signIn = new EventEmitter();
  @Output() signOut = new EventEmitter(false);

  constructor() {}

  triggerSignIn() {
    this.signIn.emit();
  }

  triggerSignOut() {
    this.signOut.emit();
  }
}
