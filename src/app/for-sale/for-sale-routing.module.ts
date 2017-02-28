import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForSaleComponent } from "./for-sale.component";
import { ForSaleDetailComponent } from "./for-sale-detail/for-sale-detail.component";

const routes: Routes = [
  {
    path: '',
    component: ForSaleComponent,
    children: [
      { path: ':slug', component: ForSaleDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ForSaleRoutingModule { }
