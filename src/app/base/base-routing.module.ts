import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'posts/category',
        loadChildren: 'app/categories/categories.module#CategoriesModule'
      },
      {
        path: 'posts/:slug',
        loadChildren: 'app/story-single/story-single.module#StorySingleModule'
      },
      {
        path: 'contact',
        loadChildren: 'app/contact/contact.module#ContactModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
