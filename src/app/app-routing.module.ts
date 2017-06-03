import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategorySingleComponent } from './categories/category-single/category-single.component';

import { BaseComponent } from './base/base.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: PostListComponent
      },
      { path: 'posts', component: PostListComponent },
      {
        path: 'posts/category',
        children: [
          { path: '', component: CategoryListComponent },
          { path: ':category', component: CategorySingleComponent }
        ]
      },
      {
        path: 'posts/:slug',
        component: PostSingleComponent
      },
      {
        path: 'history',
        loadChildren: 'app/history/history.module#HistoryModule'
      },
      {
        path: 'contact',
        loadChildren: 'app/contact/contact.module#ContactModule'
      },
      {
        path: 'analytical-services',
        loadChildren:
          'app/analytical-services/analytical-services.module#AnalyticalServicesModule'
      },
      {
        path: 'components',
        loadChildren: 'app/components/components.module#ComponentsModule'
      },
      {
        path: 'for-sale',
        loadChildren: 'app/for-sale/for-sale.module#ForSaleModule'
      },
      {
        path: 'specifications',
        loadChildren:
          'app/specifications/specifications.module#SpecificationsModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

//  ,{preloadingStrategy: PreloadAllModules}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
