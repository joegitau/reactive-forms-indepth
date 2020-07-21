import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmailMatcher(c: AbstractControl): {[key: string]: boolean} | null {
  const email = c.get('email');
  const emailConfirm = c.get('confirmEmail');

  if (email.pristine || emailConfirm.pristine) {
    return null;
  }

  if (email.value === emailConfirm.value) {
    return null;
  }

  return { 'match': true };
}
