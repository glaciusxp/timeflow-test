import {Component, OnInit} from '@angular/core';
import {MockApiService} from '../../services/mock-api.service';
import {User} from '../../models/user.model';
import {IdLabelModel} from '../../models/id-label.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private allUsers: Array<User> = null;
  users: Array<User> = null;

  userType = '';

  userTypes: Array<IdLabelModel> = [];

  viewMode: 'table' | 'grid' = 'grid';

  constructor(private api: MockApiService) { }

  ngOnInit(): void {
    this.loadUserTypeFilter();
    this.loadUsers();
  }

  onFilter(): void {
    console.log('onFilter()', this.userType, typeof this.userType);
    if (this.userType == null || this.userType === '') {
      console.log('onFilter() get All');
      this.users = this.allUsers;
    } else {
      console.log('onFilter() filtering');
      this.users = this.allUsers.filter((user) => user.userType === this.userType);
    }
  }

  private loadUserTypeFilter(): void {
    this.userTypes =
      [
        { id: '', label: 'No Filter' },
        ...this.api.getUserTypes()
      ];
  }

  private loadUsers(): void {
    this.api.getUsers().then((users: User[]) => {
      console.log('Users=', users);
      this.allUsers = users;
      this.onFilter();
    });
  }
}
