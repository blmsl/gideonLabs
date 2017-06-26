import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: '',
    loadChildren: 'app/base/base.module#BaseModule'
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
