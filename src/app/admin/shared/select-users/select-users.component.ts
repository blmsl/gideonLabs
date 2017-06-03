import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { User } from '../user';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.scss']
})
export class SelectUsersComponent implements OnInit {
  @Input() users: FirebaseListObservable<User[]>;

  @Input() parent: FormGroup;

  constructor() {}

  ngOnInit() {}
}
