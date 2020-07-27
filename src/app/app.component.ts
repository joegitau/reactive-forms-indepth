import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Component } from '@angular/core';

import { NumberValidator } from './validation/number.valdator';
import { emailMatcher } from './validation/form-validation';

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

  get addresses(): FormArray {
    return <FormArray>this.form.get('addresses');
  }

  get hobbies(): FormArray {
    return <FormArray>this.form.get('hobbies');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, { validator: emailMatcher }),
      skillLevel: [null, NumberValidator.rangeValidator(1, 10)],
      addresses: this.fb.array([ this.buildAddress() ]),
      role: ['employer'],
      employeeId: null,
      employmentDates: this.fb.group({
        start: '',
        end: ''
      }, { validator: NumberValidator.dateComparator }),
      hobbies: this.fb.array([ this.buildHobby() ]),
    });

    const roleControl = this.form.get('role');
    roleControl.valueChanges.subscribe(v => this.setRole(v));

    this.name.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(v => this.setErrorMessage(this.name));
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street: '',
      postalCode: null,
      city: '',
      country: ''
    });
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildHobby(): FormControl {
    return this.fb.control('');
  }

  addHobby(): void {
    this.hobbies.push(this.buildHobby());
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

  setErrorMessage(c: AbstractControl): void {
    this.errorMessage = '';

    if ((c.dirty || c.touched) && c.errors) {
      this.errorMessage = Object.keys(c.errors)
        .map(err => this.errorMessage += this.nameValidationMessages[err])
        .join(' ');
    }
  }

  register(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
