import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {StorageValues} from '../utils/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggerUserService {

  get username(): string {
    return localStorage.getItem(StorageValues.username);
  }

  get loggedIn(): boolean {
    return localStorage.getItem(StorageValues.username) != null &&
      localStorage.getItem(StorageValues.jwtToken) != null;
  }

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem(StorageValues.username);
    localStorage.removeItem(StorageValues.jwtToken);
    this.router.navigateByUrl('/auth/login');
  }


}
