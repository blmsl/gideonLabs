import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForSaleRoutingModule } from './for-sale-routing.module';
import { ForSaleListComponent } from "./for-sale-list/for-sale-list.component";
import { ForSaleDetailComponent } from "./for-sale-detail/for-sale-detail.component";
import { ForSaleComponent } from "./for-sale.component";

@NgModule({
  imports: [
    CommonModule,
    ForSaleRoutingModule
  ],
  declarations: [
    ForSaleDetailComponent,
    ForSaleListComponent,
    ForSaleComponent
  ]
})
export class ForSaleModule { }
