import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

class DOMHelper {
  private fixture: ComponentFixture<AppComponent>;

  constructor(fixture: ComponentFixture<AppComponent>) {
    this.fixture = fixture;
  }

  selectButton(btnText: string): void {
    this.findAll('button').forEach(button => {
      const buttonElement: HTMLButtonElement = button.nativeElement;

      if (buttonElement.textContent === btnText) {
        buttonElement.click();
      }
    });
  }

  findAll(tagName: string): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css(tagName));
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let DOMHelper: DOMHelper;

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

    // DOMHelper = new DOMHelper(fixture);

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain h4 tag with title "Registration Form"', () => {
    const h4Element = fixture.debugElement.query(By.css('h4'));
    expect(h4Element.nativeElement.textContent).toBe('Registration Form');
  });

  describe('Form', () => {
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

      const emailControl = fixture.debugElement.query(By.css("#email"));
      const confirmEmailControl = fixture.debugElement.query(By.css("#confirmEmail"));

      emailControl.nativeElement.value = 'joseph.karanja@hotmail.com';
      confirmEmailControl.nativeElement.value = 'kajoe@live.com';

      emailControl.nativeElement.dispatchEvent(new Event('input'));
      confirmEmailControl.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(email.errors).toBeFalsy();
      expect(confirmEmail.errors).toBeFalsy();

      expect(emailGroup.errors.match).toBeTruthy();
    });

    it('should validate that form is invalid & submit btn is disabled on initialization', () => {
      // form is invalid onInit
      expect(component.form.valid).toBeFalsy();

      // submit button is disabled onInit
      let btn = fixture.debugElement.query(By.css('button[type=submit]'));
      expect(btn.nativeElement.disabled).toBeTruthy();
    });

    it('should add a hobby once `addHobby` is called', () => {
      let hobbies = component.form.get('hobbies');
      hobbies.setValue(['football']);
      fixture.detectChanges();

      const addHobbySpy = spyOn(component, 'addHobby').and.callThrough();

      const btn = fixture.debugElement.queryAll(By.css('button'))
        .find(button => button.nativeElement.textContent === 'Add Hobby');

      const btnElement: HTMLButtonElement = btn.nativeElement;
      btnElement.click();

      // expect(addHobbySpy).toHaveBeenCalledTimes(1);
      expect(addHobbySpy).toHaveBeenCalled();

      // expect(component.hobbies.length).toEqual(2);
      expect(component.hobbies.value).toContain('');

    });

    describe('Set Role', () => {
      it('should setRole with the correct role', () => {
        const setRoleSpy = spyOn(component, 'setRole').and.callFake((role) => {});

        const employerRadioBtn = fixture.debugElement.query(By.css('#employer'));
        const employeeRadioBtn = fixture.debugElement.query(By.css('#employee'));

        const e1: HTMLInputElement = employerRadioBtn.nativeElement;
        // e1.dispatchEvent(new KeyboardEvent('keydown', {key: 'f'}));
        e1.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        expect(setRoleSpy).toHaveBeenCalledWith('employer');

        const e2: HTMLInputElement = employeeRadioBtn.nativeElement;
        e2.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        expect(setRoleSpy).toHaveBeenCalledWith('employee');

      });

      it('should make validation required when role is "employee"', () => {
        component.setRole('employee');
        fixture.detectChanges();

        expect(component.employeeId.errors.required).toBeTruthy();
        expect(component.start.errors.required).toBeTruthy();
        expect(component.end.errors.required).toBeTruthy();

      });

      it('should remove required validation when role NOT "employee"', () => {
        component.setRole('employee');
        fixture.detectChanges();

        expect(component.employeeId.errors.required).toBeTruthy();

        component.setRole('employer');
        fixture.detectChanges();

        expect(component.employeeId.errors).toBeFalsy();
        expect(component.start.errors).toBeFalsy();
        expect(component.end.errors).toBeFalsy();
      });
    });
  });

});
