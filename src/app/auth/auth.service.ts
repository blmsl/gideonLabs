import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private _user: firebase.User;

  
  constructor(public afAuth: AngularFireAuth) {
    this.user = null;

    afAuth.authState.subscribe(user => {
      this.user = user;
    });
    
  }

  get user(): firebase.User {
    return this._user;
  }

  set user(value: firebase.User) {
    this._user = value;
  }

  get authenticated(): boolean {
    return this._user !== null;
  }

  get id(): string {
    return this.authenticated ? this.user.uid : '';
  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new GoogleAuthProvider())
      .catch(err => console.log('ERRROR @ AuthService#signIn() :', err));
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

}
