import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {UserManagementModule} from '../user-management/user-management.module';
import {ReviewsModule} from '../reviews/reviews.module';
import {UsersComponent} from '../user-management/users/users.component';
import {ReviewsComponent} from '../reviews/reviews/reviews.component';
import {AppCommonModule} from '../app-common/app-common.module';
import { GreetingsComponent } from './greetings/greetings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: GreetingsComponent
      },
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
  declarations: [HomeComponent, GreetingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppCommonModule,
    UserManagementModule,
    ReviewsModule
  ]
})
export class HomeModule { }
