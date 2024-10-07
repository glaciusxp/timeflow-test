import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteUserConfirmDialogComponent, UsersComponent} from './users/users.component';
import {UsersCrudDialogComponent} from './users-crud-dialog/users-crud-dialog.component';
import {AppCommonModule} from '../app-common/app-common.module';

@NgModule({
  declarations: [UsersComponent, UsersCrudDialogComponent, DeleteUserConfirmDialogComponent],
  imports: [
    CommonModule,
    AppCommonModule
  ]
})
export class UserManagementModule {}
