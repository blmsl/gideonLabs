import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app'; // for typings

@Injectable()
export class FirebaseStorageService {

  downloadURL: string;

  constructor(private fbApp: FirebaseApp) {  }

  getDownloadURL(googleURI: string): firebase.Promise<any> { 
    return this.fbApp.storage().refFromURL(googleURI).getDownloadURL();
  }

}
