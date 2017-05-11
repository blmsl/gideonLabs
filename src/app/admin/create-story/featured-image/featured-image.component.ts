import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-featured-image',
  styleUrls: ['./featured-image.component.scss'],
  template: `
    <div class="featured-image">
      <h2>Featured Image</h2>
      <div *ngIf="imageUrl">
        <img [src]="imageUrl" />
      </div>
    </div>
  `
})
export class FeaturedImageComponent {

  @Input()
  imageUrl: string;

}
