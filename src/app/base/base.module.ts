import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BaseRoutingModule } from './base-routing.module';

@NgModule({
  imports: [CommonModule, BaseRoutingModule, RouterModule],
  declarations: [
    BaseComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent
  ],
  exports: [BaseComponent, NavbarComponent, FooterComponent]
})
export class BaseModule {}
