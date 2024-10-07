import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {StorageValues} from '../utils/storage.enum';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem(StorageValues.userData);
    localStorage.removeItem(StorageValues.jwtToken);
    this.router.navigateByUrl('/auth/login').then(() => {});
  }

  get user(): User {
    const user = localStorage.getItem(StorageValues.userData);
    return user ? (JSON.parse(user) as User) : null;
  }

  get loggedIn(): boolean {
    const jwtToken = localStorage.getItem(StorageValues.jwtToken);
    return jwtToken != null && this.user != null;
  }

}
