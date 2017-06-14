import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllStoriesComponent } from './all-stories.component';

const routes: Routes = [
  {
    path: '',
    component: AllStoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllStoriesRoutingModule {}
