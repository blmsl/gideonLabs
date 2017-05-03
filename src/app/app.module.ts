import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { WordPressModule } from 'ng2-wp-api';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { CategoryService } from './categories/category.service';
import { AuthService } from "./auth/auth.service";

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategorySingleComponent } from './categories/category-single/category-single.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { FooterComponent } from './footer/footer.component';
import { BaseComponent } from './base/base.component';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AuthGuard } from "./auth/auth.guard";
import { ChildGuard } from "./auth/child-guard.guard";
import { TaxonomyService } from "./taxonomy/taxonomy.service";

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    CategoryService, 
    AuthService,
    AuthGuard,
    ChildGuard,
    TaxonomyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

