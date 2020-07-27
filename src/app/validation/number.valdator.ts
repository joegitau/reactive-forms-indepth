import { ValidatorFn, AbstractControl } from '@angular/forms';

export class NumberValidator {
  static rangeValidator(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
      if (c.value !== null && isNaN(c.value) || c.value <= min || c.value >= max) {
        return { 'range': true };
      }
      return null;
    }
  }

  static dateComparator(c: AbstractControl): {[key: string]: boolean} | null {
    const start = c.get('start'),
          end   = c.get('end');

    if (start.pristine || end.pristine) return null;
    if (start.value <= end.value) return null;

    return {'compare': true}
  }
}
