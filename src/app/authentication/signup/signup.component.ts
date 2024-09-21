import { Component, OnInit } from '@angular/core';
import {FormGenerator} from '../utils/form-generator';
import {IdLabelModel} from '../../models/id-label.model';
import {MockApiService} from '../../services/mock-api.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userTypes: Array<IdLabelModel> = [];

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  signUpForm = FormGenerator.buildRegisterForm();

  constructor(private api: MockApiService,
              private router: Router,
              private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.userTypes = this.api.getUserTypes();
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) return;

    this.api.submitRegister(this.signUpForm.value)
      .then((isOk) => this.manageResponse(isOk))
      .catch(this.manageError);
  }

  private manageResponse(isOk: boolean): void {
    if (isOk) {
      this.notificationService.notify('Welcome ' + this.signUpForm.value.username);
      this.router.navigateByUrl('/app').then(() => {});
    }
  }

  private manageError(error: Error): void {
    console.error(error);
  }

}
