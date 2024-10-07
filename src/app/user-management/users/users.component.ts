import {Component, Inject, OnInit} from '@angular/core';
import {MockApiService} from '../../services/mock-api.service';
import {User} from '../../models/user.model';
import {IdLabelModel} from '../../models/id-label.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UsersCrudDialogComponent} from '../users-crud-dialog/users-crud-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private allUsers: Array<User> = null;
  users: Array<User> = null;

  sortField = 'username';
  sortDirection = 'asc';

  sortFields: Array<IdLabelModel> = [];

  userTypeFilter = '';

  userTypes: Array<IdLabelModel> = [];

  viewMode: 'table' | 'grid' = 'grid';

  constructor(private api: MockApiService,
              private dialog: MatDialog) { }

  // Caricamento dati
  ngOnInit(): void {
    this.loadUserTypeFilter();
    this.loadSortFields();
    this.loadUsers();
  }

  // Filtro tipo utente
  onFilter(): void {
    if (this.userTypeFilter == null || this.userTypeFilter === '') {
      this.users = this.allUsers;
    } else {
      this.users = this.allUsers.filter((user) => user.userType === this.userTypeFilter);
    }
  }

  onEditUser(user: User): void {
    this._onOpenUserCrudDialog(user);
  }

  onNewUser(): void {
    this._onOpenUserCrudDialog(new User());
  }

  onSort(): void {
    this.users.sort((a, b) => {
      return a[this.sortField].localeCompare(b[this.sortField]) * (this.sortDirection === 'asc' ? 1 : -1);
    });
  }

  onDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserConfirmDialogComponent, {
      width: '30rem',
      data: user
    });

    dialogRef.afterClosed().subscribe((confirmDelete: boolean) => {
      if (confirmDelete) {
        // Ricarico dati dopo eliminazione
        this.loadUsers();
      }
    });
  }

  private _onOpenUserCrudDialog(user: User): void {
    const dialogRef = this.dialog.open(UsersCrudDialogComponent, {
      width: '30rem',
      data: user
    });

    dialogRef.afterClosed().subscribe((isOk: boolean) => {
      if (isOk) {
        // Ricarico dati dopo inserimento/modifica
        this.loadUsers();
      }
    });
  }

  private loadUserTypeFilter(): void {
    this.userTypes =
      [
        { id: '', label: 'No Filter' },
        ...this.api.getUserTypes()
      ];
  }

  private loadSortFields(): void {
    this.sortFields =
      [
        { id: 'id', label: 'Insertion order' },
        { id: 'username', label: 'Username' },
        { id: 'email', label: 'E-mail' },
        { id: 'userType', label: 'User Type' },
        { id: 'fullName', label: 'Full Name' }
      ];
  }

  private loadUsers(): void {
    this.api.getUsers().then((users: User[]) => {
      console.log('Users=', users);
      this.allUsers = users;
      this.onFilter();
      this.onSort();
    });
  }
}

@Component({
  selector: 'delete-user-confirm',
  template: `
    <h1 mat-dialog-title>Delete User Confirm</h1>
    <mat-dialog-content>
      Do you really want to delete user <strong>{{ user?.username }}</strong>?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close (click)="onClose()">Undo</button>
      <button mat-button mat-dialog-close (click)="onDelete()">Delete</button>
    </mat-dialog-actions>
  `
})
export class DeleteUserConfirmDialogComponent {
  constructor(public dialog: MatDialogRef<DeleteUserConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User,
              private api: MockApiService
  ) { }

  onClose(): void {
    this.dialog.close(false);
  }

  onDelete(): void {
    this.api.deleteUser(this.user)
      .then(() => {
        this.dialog.close(true);
      });
  }
}
