import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BaseComponent, NavbarComponent, FooterComponent],
  exports: [BaseComponent, NavbarComponent, FooterComponent]
})
export class BaseModule {}
