import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('emailGroup.email'); }
  get confirmEmail() { return this.form.get('emailGroup.confirmEmail'); }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }),

    });
  }

  register() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
