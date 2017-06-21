import { Component, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { FormGroup } from '@angular/forms';
import { User } from '../../../shared/user';

@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.scss']
})
export class SelectUsersComponent {
  @Input() users: FirebaseListObservable<User[]>;

  @Input() parent: FormGroup;
}
