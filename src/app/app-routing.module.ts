import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategorySingleComponent } from './categories/category-single/category-single.component';
import { AnalyticalServicesComponent } from './analytical-services/analytical-services.component';
import { ServiceDetailComponent } from './analytical-services/service-detail/service-detail.component';
import { ComponentsComponent } from './components/components.component';
import { HistoryComponent } from './history/history.component';
import { ForSaleComponent } from './for-sale/for-sale.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  {
    path: 'posts/category', children: [
      { path: '', component: CategoryListComponent },
      { path: ':category', component: CategorySingleComponent }
    ]
  },
  {
    path: 'posts/:slug',
    component: PostSingleComponent
  },
  { 
    path: 'analytical-services', 
    component: AnalyticalServicesComponent,
    children: [
      { path: ':slug', component: ServiceDetailComponent },
    ]
  },
  {
    path: 'components', component: ComponentsComponent
  },
  {
    path: 'history', component: HistoryComponent
  },
  {
    path: 'for-sale', component: ForSaleComponent
  },
  {
    path: 'specifications', component: SpecificationsComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: '',
    component: PostListComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }