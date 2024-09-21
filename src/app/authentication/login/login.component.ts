import {Component, OnInit} from '@angular/core';
import {MockApiService} from '../../services/mock-api.service';
import {IdLabelModel} from '../../models/id-label.model';
import {FormGenerator} from '../utils/form-generator';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userTypes: Array<IdLabelModel> = [];

  hidePassword = true;

  loginForm = FormGenerator.buildLoginForm();

  constructor(private api: MockApiService,
              private notificationService: NotificationService,
              private router: Router
  ) {

  }

  ngOnInit(): void {
    this.userTypes = this.api.getUserTypes();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) { return; }

    this.api.submitLogin(this.loginForm.value)
      .then((isOk) => this.manageResponse(isOk))
      .catch(this.manageError);
  }

  private manageResponse(isOk: boolean): void {
    if (isOk) {
      this.notificationService.notify('Welcome back, ' + this.loginForm.value.username);
      this.router.navigateByUrl('/app').then(() => {});
    }
  }

  private manageError(error: Error): void {
    console.error(error);
  }
}
