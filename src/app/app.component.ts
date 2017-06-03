import { Component, OnInit } from '@angular/core';
import { WpService } from 'ng2-wp-api';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = false;
  errors = [];

  constructor(private wpService: WpService) {}

  ngOnInit() {
    this.wpService.config.baseUrl = 'https://www.gideonlabs.com';
    this.wpService.config.loading.subscribe(res => (this.loading = res));
    this.wpService.config.errors.subscribe(res => this.errors.push(res));
  }
}
