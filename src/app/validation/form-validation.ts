import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * cross-field validation for matching emails
 * @param c
 */
export function emailMatcher(c: AbstractControl): {[key: string]: boolean} | null {
  const email = c.get('email');
  const emailConfirm = c.get('confirmEmail');

  if (email.pristine || emailConfirm.pristine)
    return null;

  if (email.value === emailConfirm.value)
    return null;

  return { 'match': true };
}

/**
 * Validate that min value does not exceed specified max value
 * @param c
 */
export function minMaxValidator(c: AbstractControl): {[key:string]: boolean} | null {
  const start = c.get('start');
  const end = c.get('end');

  if (start.pristine || end.pristine)
    return null;

  if (start.value <= end.value)
    return null;

  return { 'minMax': true };
}
