import {Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NotificationService} from './services/notification.service';
import {MockApiService} from './services/mock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'timeflow';

  constructor(private notificationService: NotificationService,
              private snackBar: MatSnackBar,
              private api: MockApiService
  ) {}

  ngOnInit(): void {
    // Gestione centralizzata snackBar
    this.notificationService.notifier
      .subscribe((message) => {
        this.snackBar.open(message, 'x', {duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'});
      });

    // Inizializzazione database (IndexedDB)
    this.api.init().then(() => {
      console.log('DB Ready!');
    });
  }
}
