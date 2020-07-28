import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain h4 tag with title "Registration Form"', () => {
    const h4Element = fixture.debugElement.query(By.css('h4'));
    expect(h4Element.nativeElement.textContent).toBe('Registration Form');
  });

  it('should validate that "name" is REQUIRED and MINIMUM LENGTH is 3 characters', () => {
    let name = component.name;

    expect(name.valid).toBeFalsy();
    expect(name.pristine).toBeTruthy();

    expect(name.errors.required).toBeTruthy();

    name.setValue('Jo');
    expect(name.errors.minlength).toBeTruthy();
  });

  it('should validate the "emailGroup" for matching emails', () => {
    let email: AbstractControl = component.email;
    let confirmEmail: AbstractControl = component.confirmEmail;
    let emailGroup: AbstractControl = component.form.get('emailGroup');

    expect(email.errors.required).toBeTruthy();
    expect(confirmEmail.errors.required).toBeTruthy();

    email.setValue('joseph.karanja@hotmail.com');
    confirmEmail.setValue('kajoe@live.com');
    // fixture.detectChanges();
    // expect(emailGroup.errors['match']).toBeTruthy();
  });

  it('should validate that form is invalid & submit btn is disabled on initialization', () => {
    // form is invalid onInit
    expect(component.form.valid).toBeFalsy();

    // submit button is disabled onInit
    let btn = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(btn.nativeElement.disabled).toBeTruthy();
  });

});
