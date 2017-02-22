import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { WordPressModule } from 'ng2-wp-api';

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRoutingModule } from './app-routing.module';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategorySingleComponent } from './categories/category-single/category-single.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryService } from './categories/category.service';
import { AnalyticalServicesComponent } from './analytical-services/analytical-services.component';
import { ServiceDetailComponent } from './analytical-services/service-detail/service-detail.component';
import { ComponentsComponent } from './components/components.component';
import { ForSaleComponent } from './for-sale/for-sale.component';
import { ContactComponent } from './contact/contact.component';
import { HistoryComponent } from './history/history.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { ServiceListComponent } from './analytical-services/service-list/service-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostSingleComponent,
    NavbarComponent,
    CategorySingleComponent,
    CategoryListComponent,
    AnalyticalServicesComponent,
    ServiceDetailComponent,
    ComponentsComponent,
    ForSaleComponent,
    ContactComponent,
    HistoryComponent,
    SpecificationsComponent,
    ServiceListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WordPressModule,
    AppRoutingModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
