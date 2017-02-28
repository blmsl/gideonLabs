import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact',
  styleUrls: ['./contact.component.scss'],
  template: `
  <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeiNfQQFbqNAGwtaStGqDRn7FqVxrfUADx77dWtq4UkkTypUg/viewform?embedded=true" width="100%" height="1000" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
  `
})
export class ContactComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
   
  }

}
