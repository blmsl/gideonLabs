import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private auth: AuthService, private router: Router) {}

  async signInWithGoogle() {
    await this.auth.signInWithGoogle();
    this.postSignIn();
  }

  postSignIn(): Promise<boolean> {
    return this.router.navigate(['/admin']);
  }
}
