import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from './custom-validators';

export class FormGenerator {

  /** Validatore username:
   * - almeno 5 caratteri
   * - può contenere solo lettere e numeri
   */
  private static readonly usernameRegex = /^(?=.*[A-Za-z0-9][^!@#$&*_?|§\s]).{5,}/;

  /** Validatore password:
   * - almeno 8 caratteri
   * - almeno una maiuscola
   * - almeno una minuscola
   * - almeno un numero
   * - almeno un carattere speciale
   */
  private static readonly strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*_?|§]).{8,}$/;

  public static buildLoginForm(): FormGroup {
    return new FormGroup(
      {
        username: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        userType: new FormControl(
          'client',
          [
            Validators.required
          ]
        ),
        password: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
      }
    );
  }

  public static buildRegisterForm(): FormGroup {
    return new FormGroup(
      {
        username: new FormControl(
          '',
          [
            Validators.required,
            Validators.pattern(this.usernameRegex)
          ]
        ),
        email: new FormControl(
          '',
          [
            Validators.required,
            Validators.email
          ]
        ),
        userType: new FormControl(
          'client',
          Validators.required
        ),
        password: new FormControl(
          '',
          [
            Validators.required,
            Validators.pattern(this.strongPasswordRegex)
          ]
        ),
        confirmPassword: new FormControl(
          '',
          [
            Validators.required,
            Validators.pattern(this.strongPasswordRegex)
          ]
        ),
      },
      {
        validators: CustomValidators.passwordMatch
      }
    );
  }
}
