import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { WordPressModule } from 'ng2-wp-api';

import { CategoryService } from './categories/category.service';

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategorySingleComponent } from './categories/category-single/category-single.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostSingleComponent,
    NavbarComponent,
    CategorySingleComponent,
    CategoryListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WordPressModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
