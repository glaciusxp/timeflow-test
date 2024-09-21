import { Component, OnInit } from '@angular/core';
import {LoggerUserService} from '../services/logger-user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
  '[class.home-selector]': 'true'
}
})
export class HomeComponent implements OnInit {

  constructor(public loggedUser: LoggerUserService,
              private router: Router) { }

  ngOnInit(): void {}

}
