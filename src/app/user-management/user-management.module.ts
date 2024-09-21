import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersComponent, UsersCrud} from './users/users.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersCrudDialogComponent } from './users-crud-dialog/users-crud-dialog.component';

@NgModule({
  declarations: [UsersComponent, UsersCrud, UsersCrudDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class UserManagementModule {}
