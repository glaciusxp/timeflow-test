import { Component, OnInit } from '@angular/core';
import {LoggedUserService} from '../services/logged-user.service';
import {MockApiService} from '../services/mock-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
  '[class.home-selector]': 'true'
  }
})
export class HomeComponent implements OnInit {

  constructor(public loggedUser: LoggedUserService,
              public api: MockApiService) { }

  ngOnInit(): void {}

}
