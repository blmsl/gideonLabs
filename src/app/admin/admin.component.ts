import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(public auth: AuthService, 
              private router: Router) { }

  signIn() {
    this.auth.signInWithGoogle();
  }

  signOut(): void {
        this.auth.signOut();
        this.router.navigate(['admin', 'sign-in']);
    }

}
