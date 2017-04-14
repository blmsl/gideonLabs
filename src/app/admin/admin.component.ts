import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { FirebaseAuthState } from "angularfire2";
import { UserInfo } from "firebase";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    console.log('User logged in:', this.auth.state);
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle();
  }

  logout() {
    this.auth.signOut();
  }

}
