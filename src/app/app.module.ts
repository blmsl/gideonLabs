import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { WordPressModule } from 'ng2-wp-api';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { environment } from '../environments/environment';

import { CategoryService } from './categories/category.service';

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategorySingleComponent } from './categories/category-single/category-single.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { FooterComponent } from './footer/footer.component';
import { BaseComponent } from './base/base.component';
import { AuthService } from "./auth/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostSingleComponent,
    NavbarComponent,
    CategorySingleComponent,
    CategoryListComponent,
    FooterComponent,
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WordPressModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, {
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    }),
  ],
  providers: [
    CategoryService, 
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
