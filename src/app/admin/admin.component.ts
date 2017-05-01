import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { MdSnackBar, MdIconRegistry } from '@angular/material';
import { DomSanitizer } from "@angular/platform-browser";



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public auth: AuthService, 
              private router: Router, 
              public snackBar: MdSnackBar,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer) { 
    
    iconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/auth/google.svg'));

  }

  ngOnInit() { }

  signIn() {
    this.auth.signInWithGoogle();
  }

  signOut(message: string): void {
        this.auth.signOut();
        this.router.navigate(['admin', 'sign-in']);

        this.snackBar.open(message, undefined, {
            duration: 1000
        });
    }

}
