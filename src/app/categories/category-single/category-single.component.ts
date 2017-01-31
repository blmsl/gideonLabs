import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpQueryArgs, WpService, CollectionResponse } from 'ng2-wp-api';

@Component({
  selector: 'app-category-single',
  templateUrl: './category-single.component.html',
  styleUrls: ['./category-single.component.css']
})
export class CategorySingleComponent implements OnInit {
  category: string;
  slug: string;

  constructor(private route: ActivatedRoute,
              private wpService: WpService) {
    route.params.subscribe((param: any) => this.slug = param['category']);
  }

  ngOnInit() {

    let args = new WpQueryArgs({
      _embed: true
    });

    this.wpService.collection().categories().get({ slug: this.slug })
      .subscribe((res: CollectionResponse) => {
        if (res.error) {
          console.log(res.error)
        } else {
          this.category = res.data[0];
          console.log(this.category);
        }
      });

  }

}
