import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { emailMatcher, minMaxValidator, rangeValidator } from './validation/form-validation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  errorMessage: string;

  private nameValidationMessages = {
    required: 'Name is required.',
    minlength: 'Name must have more than 3 characters.'
  }

  constructor(private fb: FormBuilder) {
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('emailGroup.email'); }
  get confirmEmail() { return this.form.get('emailGroup.confirmEmail'); }
  get skillLevel() { return this.form.get('skillLevel'); }
  get employeeId() { return this.form.get('employeeId'); }
  get start() { return this.form.get('employmentDates.start'); }
  get end() { return this.form.get('employmentDates.end'); }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, { validator: emailMatcher }),
      skillLevel: [null, rangeValidator(1, 10)],
      role: ['employer'],
      employeeId: null,
      employmentDates: this.fb.group({
        start: '',
        end: ''
      }, { validator: minMaxValidator }),
    });

    const roleControl = this.form.get('role');
    roleControl.valueChanges.subscribe(v => this.setRole(v));

    this.name.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(v => this.setErrorMessage(this.name));
  }

  setErrorMessage(c: AbstractControl) {
    this.errorMessage = '';

    if ((c.dirty || c.touched) && c.errors) {
      this.errorMessage = Object.keys(c.errors)
        .map(err => this.errorMessage += this.nameValidationMessages[err])
        .join(' ');
    }
  }

  register() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  setRole(role: string): void {
    const employeeId = this.form.get('employeeId'),
          start      = this.form.get('employmentDates.start'),
          end        = this.form.get('employmentDates.end');

    if (role === 'employee') {
      employeeId.setValidators(Validators.required);
      start.setValidators(Validators.required);
      end.setValidators(Validators.required);
    } else {
      employeeId.clearValidators();
      start.clearValidators();
      end.clearValidators();
    }

    employeeId.updateValueAndValidity();
    start.updateValueAndValidity();
    end.updateValueAndValidity();
  }
}
