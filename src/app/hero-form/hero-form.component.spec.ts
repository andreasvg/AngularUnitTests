import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeroFormComponent } from './hero-form.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HeroFormComponent ]
    });
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should NOT show a validation error if the first name is not empty', fakeAsync(() => {
    // Arrange:
    let firstNameGroup: DebugElement;
    let firstNameInput: DebugElement;
    let firstNameValidationError: DebugElement;

    fixture.detectChanges();
    firstNameGroup = fixture.debugElement.query(By.css('#firstNameGroup'));
    firstNameInput = firstNameGroup.query(By.css('input'));
    fixture.detectChanges();
    firstNameValidationError = firstNameGroup.query(By.css('.validation-error'));
    expect(firstNameValidationError).toBeFalsy();

    // Act:
    firstNameInput.nativeElement.value = 'SomeValue';
    firstNameInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert:
    fixture.whenStable().then(() => {
      firstNameValidationError = firstNameGroup.query(By.css('.validation-error'));
      expect(firstNameValidationError).toBeFalsy();
      expect(fixture.componentInstance.person.firstName).toBe('SomeValue');
    });
  }));

  it('should show a validation error if the first name is empty', fakeAsync(() => {
    // Arrange:
    let firstNameGroup: DebugElement;
    let firstNameInput: DebugElement;
    let firstNameValidationError: DebugElement;

    firstNameGroup = fixture.debugElement.query(By.css('#firstNameGroup'));
    firstNameInput = firstNameGroup.query(By.css('input'));
    fixture.detectChanges();
    firstNameValidationError = firstNameGroup.query(By.css('.validation-error'));
    expect(firstNameValidationError).toBeFalsy();

    // Act:
    fixture.componentInstance.person.firstName = '';
    firstNameInput.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    // Assert:
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      firstNameValidationError = firstNameGroup.query(By.css('.validation-error'));
      expect(firstNameValidationError).toBeTruthy();
    });
  }));

});

