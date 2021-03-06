import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-contact',
  styleUrls: ['./contact.component.scss'],
  templateUrl: 'contact.component.html'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      problem: ['', Validators.required]
    });
  }

  onSubmit() {
    const { name, email, problem } = this.contactForm.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${problem}</div>
    `;
    let message = {
      name,
      email,
      problem,
      date,
      html
    };
    this.db.list('/messages').push(message);
    this.contactForm.reset();
  }
}
