import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
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

  it('should validate that "name" is REQUIRED & MINIMUM_LENGTH(3)', () => {
    let name = component.name;
    expect(name.valid).toBeFalsy();
    expect(name.pristine).toBeTruthy();

    expect(name.errors.required).toBeTruthy();

    name.setValue('Jo');
    expect(name.errors.minlength).toBeTruthy();
  });

});

