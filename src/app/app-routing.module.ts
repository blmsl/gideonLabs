import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategorySingleComponent } from './categories/category-single/category-single.component';


import { ComponentsComponent } from './components/components.component';
import { HistoryComponent } from './history/history.component';
import { ForSaleComponent } from './for-sale/for-sale.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { ContactComponent } from './contact/contact.component';
import { ForSaleDetailComponent } from './for-sale/for-sale-detail/for-sale-detail.component';

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
    loadChildren: 'app/analytical-services/analytical-services.module#AnalyticalServicesModule'
  },
  {
    path: 'components',
    loadChildren: 'app/components/components.module#ComponentsModule'
  },
  {
    path: 'history',
    loadChildren: 'app/history/history.module#HistoryModule'
  },
  {
    path: 'for-sale',
    loadChildren: 'app/for-sale/for-sale.module#ForSaleModule'
  },
  {
    path: 'specifications',
    loadChildren: 'app/specifications/specifications.module#SpecificationsModule'
  },
  {
    path: 'contact', 
    loadChildren: 'app/contact/contact.module#ContactModule'
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