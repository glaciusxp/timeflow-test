import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {StorageValues} from '../utils/storage.enum';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor() {}

  // Verifico che lo user e il token siano presenti per consentire l'accesso alle pagine di gestione utenti e recensioni
  canActivate(_: ActivatedRouteSnapshot, __: RouterStateSnapshot): boolean  {
    const token = localStorage.getItem(StorageValues.jwtToken);
    const user = localStorage.getItem(StorageValues.userData);

    console.log('canActivate()', token, user);

    return this.isValidToken(token, user);
  }


  // Semplice controllo di esistenza
  private isValidToken(token: string, user: string): boolean {
    return token != null && user != null;
  }

}
