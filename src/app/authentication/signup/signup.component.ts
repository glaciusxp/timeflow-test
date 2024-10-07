import { Component, OnInit } from '@angular/core';
import {FormGenerator} from '../utils/form-generator';
import {IdLabelModel} from '../../models/id-label.model';
import {MockApiService} from '../../services/mock-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userTypes: Array<IdLabelModel> = [];

  // Flag per mostrare/occultare il contenuto dei campi password.
  hidePassword = true;
  hideConfirmPassword = true;

  // Carico il form
  signUpForm = FormGenerator.buildRegisterForm();

  constructor(private api: MockApiService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    // Carico gli user type
    this.userTypes = this.api.getUserTypes();
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    // Effettuo la registazione dell'utente
    this.api.submitRegister(this.signUpForm.value)
      .then((isOk) => this.manageResponse(isOk))
      .catch(this.manageError);
  }

  // Tutti i controlli di formalità vengono fatti sul form direttamente.
  // In questo applicativo non ci sono casi in cui il salvataggio possa non andare a buon fine
  private manageResponse(isOk: boolean): void {
    if (isOk) {
      this.router.navigateByUrl('/app').then(() => {});
    }
  }

  private manageError(error: Error): void {
    console.error(error);
  }

}
