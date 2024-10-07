import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from './custom-validators';
import {User} from '../../models/user.model';

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

  public static buildUserForm(user: User): FormGroup {
    if (user == null) {
      user = new User();
    }

    return new FormGroup({
      id: new FormControl(user.id),
      userType: new FormControl(user.userType, [Validators.required]),
      username: new FormControl(user.username, [Validators.required]),
      fullName: new FormControl(user.fullName, [Validators.required]),
      email: new FormControl(user.email, [Validators.required, Validators.email])
    }
    );
  }

  public static buildReviewForm(): FormGroup {
    return new FormGroup({
      rating: new FormControl(0, [Validators.required]),
      info: new FormControl('', [Validators.required]),
      // I seguenti campi saranno valorizzati nel servizio di salvataggio
      // con i dati dell'utente loggato e la system date
      user: new FormControl(null),
      email: new FormControl(null),
      insertDate: new FormControl(null)
    });
  }
}
