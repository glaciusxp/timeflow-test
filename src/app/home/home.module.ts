import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {UserManagementModule} from '../user-management/user-management.module';
import {ReviewsModule} from '../reviews/reviews.module';
import {UsersComponent} from '../user-management/users/users.component';
import {ReviewsComponent} from '../reviews/reviews/reviews.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    UserManagementModule,
    ReviewsModule
  ]
})
export class HomeModule { }
