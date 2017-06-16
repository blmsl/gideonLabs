import { Component, Input } from '@angular/core';
import { Picture } from '../../../shared/picture';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent {
  @Input() pictures: Picture[];
}
