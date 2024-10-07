import {FormGroup, ValidationErrors} from '@angular/forms';
import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {MockApiService} from '../../services/mock-api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IdLabelModel} from '../../models/id-label.model';
import {FormGenerator} from '../../authentication/utils/form-generator';

@Component({
  selector: 'app-users-crud-dialog',
  templateUrl: './users-crud-dialog.component.html',
  styleUrls: ['./users-crud-dialog.component.scss']
})
export class UsersCrudDialogComponent implements OnInit {

  userForm: FormGroup;

  userTypes: Array<IdLabelModel> = [];

  constructor(public dialogRef: MatDialogRef<UsersCrudDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User,
              private api: MockApiService
  ) {
  }

  ngOnInit(): void {
    this.userForm = FormGenerator.buildUserForm(this.user);
    this.loadUserTypes();
  }

  onSubmit(): void {
    if (!this.userForm.valid) { return; }

    if (this.userForm.value.id == null) {
      this.api.postInsertUser(this.userForm.value)
        .then((isOk) => {
          if (isOk) {
            this.dialogRef.close(true);
          } else {
            const error: ValidationErrors = { exists: 'Username and/or Email already exists!' };
            this.userForm.get('username').setErrors(error);
            this.userForm.get('email').setErrors(error);
            this.userForm.setErrors(error);
          }
        });
    } else {
      this.api.putUpdateUser(this.userForm.value)
        .then((response) => {
          this.dialogRef.close(response);
        });
    }

  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  private loadUserTypes(): void {
    this.userTypes = this.api.getUserTypes();
  }
}
