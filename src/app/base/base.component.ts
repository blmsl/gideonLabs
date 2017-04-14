import { Component, OnInit } from '@angular/core';
import { WpService } from 'ng2-wp-api'

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  loading = false;
  errors = [];

  constructor(private wpService: WpService) {}
  
  ngOnInit() {
    this.wpService.config.baseUrl = "https://www.gideonlabs.com";
    this.wpService.config.loading
      .subscribe(res => this.loading = res);
    this.wpService.config.errors
      .subscribe(res => this.errors.push(res));
  }
}
