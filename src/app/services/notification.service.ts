import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifier$: Subject<string> = new Subject<string>();

  get notifier(): Observable<string> {
    return this.notifier$.asObservable();
  }

  notify(message: string): void {
    this.notifier$.next(message);
  }

  constructor() {}



}
