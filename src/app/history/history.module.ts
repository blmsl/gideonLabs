import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from "./history.component";

@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule
  ],
  declarations: [HistoryComponent]
})
export class HistoryModule { }
