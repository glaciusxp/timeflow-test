import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {StorageValues} from '../utils/storage.enum';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private localStorage: LocalStorage) {}

  async canActivate(_: ActivatedRouteSnapshot, __: RouterStateSnapshot): Promise<boolean>  {
    const token = await this.localStorage.getItem(StorageValues.jwtToken, {type: 'string'}).toPromise();
    const user = await this.localStorage.getItem(StorageValues.username, {type: 'string'}).toPromise();

    console.log('canActivate()', token, user);

    return this.isValidToken(token, user);
  }


  // Semplice controllo di esistenza
  private isValidToken(token: string, user: string): boolean {
    return token != null && user != null;
  }

}
