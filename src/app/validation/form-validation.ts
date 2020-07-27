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
 * Validate that start date is not greater than a specified end date
 * @param c
 */
// export function minMaxValidator(c: AbstractControl): {[key:string]: boolean} | null {
//   const start = c.get('start');
//   const end = c.get('end');

//   if (start.pristine || end.pristine)
//     return null;

//   if (start.value <= end.value)
//     return null;

//   return { 'minMax': true };
// }

/**
 * Custom validator with multiple params
 * @param min, @param max
 */
// export function rangeValidator(min: number, max: number): ValidatorFn {
//   return (c: AbstractControl): {[key: string]: boolean} | null => {
//     if (c.value !== null && isNaN(c.value) || c.value <= min || c.value >= max) {
//       return { 'range': true };
//     }
//     return null;
//   }
// }
