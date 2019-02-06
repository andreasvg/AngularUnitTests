import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { PersonFormComponent } from './person-form.component';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PersonFormComponent', () => {
  let fixture: ComponentFixture<PersonFormComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ PersonFormComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonFormComponent);
    fixture.detectChanges();
  });

  it('should show a validation error if the first name was touched but left empty', () => {
    let firstNameValidationError: DebugElement;
    fixture.detectChanges(); // run change detection

    // try to get a handle to the validation message (should exist as form is invalid):
    firstNameValidationError = fixture.debugElement.query(By.css('.validation-error'));

    // the validation error should be found:
    expect(firstNameValidationError).toBeTruthy();
  });
});

