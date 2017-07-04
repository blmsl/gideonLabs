import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { WordPressModule } from 'ng2-wp-api';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AuthService } from './auth/auth.service';

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AuthGuard } from './auth/auth.guard';
import { ChildGuard } from './auth/child-guard.guard';
import { BaseModule } from './base/base.module';
import { FirebaseStorageService } from './services/firebase-storage.service';

@NgModule({
  declarations: [AppComponent, PostListComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BaseModule,
    WordPressModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, AuthGuard, ChildGuard, FirebaseStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
