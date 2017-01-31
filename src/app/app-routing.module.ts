import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategorySingleComponent } from './categories/category-single/category-single.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'category', component: CategoryListComponent },
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