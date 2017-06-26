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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
