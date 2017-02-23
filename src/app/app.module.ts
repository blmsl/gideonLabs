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
import { AnalyticalServicesComponent } from './analytical-services/analytical-services.component';
import { ServiceDetailComponent } from './analytical-services/service-detail/service-detail.component';
import { ComponentsComponent } from './components/components.component';
import { ForSaleComponent } from './for-sale/for-sale.component';
import { ContactComponent } from './contact/contact.component';
import { HistoryComponent } from './history/history.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { ServiceListComponent } from './analytical-services/service-list/service-list.component';
import { ForSaleListComponent } from './for-sale/for-sale-list/for-sale-list.component';
import { ForSaleDetailComponent } from './for-sale/for-sale-detail/for-sale-detail.component';

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
    ServiceListComponent,
    ForSaleListComponent,
    ForSaleDetailComponent
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
