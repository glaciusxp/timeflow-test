import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';

export class CustomValidators {

  public static passwordMatch(formGroup: AbstractControl): ValidationErrors {
    const control = formGroup.get('password');
    const matchingControl = formGroup.get('confirmPassword');

    console.log(formGroup);

    if (formGroup.hasError('required') || formGroup.hasError('pattern')) {
      return formGroup.errors;
    }

    if (control.value !== matchingControl.value) {
      const error = { matcher: 'Password doesn\'t match' };
      matchingControl.setErrors(error);
      return error;
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  }

}
