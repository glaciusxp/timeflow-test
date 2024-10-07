import {Component, OnInit} from '@angular/core';
import {MockApiService} from '../../services/mock-api.service';
import {IdLabelModel} from '../../models/id-label.model';
import {FormGenerator} from '../utils/form-generator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: MockApiService,
              private router: Router
  ) {

  }

  userTypes: Array<IdLabelModel> = [];

  hidePassword = true;

  // Genero il form
  loginForm = FormGenerator.buildLoginForm();

  ngOnInit(): void {
    // Carico le options della dropdown User Types
    this.userTypes = this.api.getUserTypes();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) { return; }

    // Effettuo il login
    this.api.submitLogin(this.loginForm.value)
      .then((isOk) => this.manageResponse(isOk))
      .catch(this.manageError);
  }

  // Gestico la risposta
  // Seppur la password non venga controllata, viene effettuata la verifica di esistenza dello username;
  // In caso contrario, restituisco errore.
  private manageResponse(isOk: boolean): void {
    if (isOk) {
      this.router.navigateByUrl('/app').then(() => {});
    } else {
      this.loginForm.setErrors({login: 'Invalid username or password'});
    }
  }

  private manageError(error: Error): void {
    console.error(error);
  }
}
