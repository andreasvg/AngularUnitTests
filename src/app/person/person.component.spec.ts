import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component } from '@angular/core';
import { Person } from './person';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-parent',
  template: '<div><app-person [person]="person"></app-person></div>'
})
class ParentComponent {
  public person: Person;
}

describe('PersonComponent', () => {
  let parentFixture: ComponentFixture<ParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonComponent, ParentComponent ]
    });
    parentFixture = TestBed.createComponent(ParentComponent);
  });

  it('should display first and last name of person passed in from parent component', () => {
    // Arrange:
    const person = { firstName: 'Andreas', lastName: 'van Greunen'};

    // Act:
    parentFixture.componentInstance.person = person;
    parentFixture.detectChanges();

    // Assert:
    const child = parentFixture.debugElement.query(By.directive(PersonComponent));
    const spans = child.queryAll(By.css('span'));

    // Check the template output:
    expect(spans.length).toBe(2);
    expect(spans[0].nativeElement.innerText).toContain('Andreas');
    expect(spans[1].nativeElement.textContent).toContain('van Greunen');

    // Check the properties of the child component class:
    expect(child.componentInstance.person.firstName).toBe('Andreas');
    expect(child.componentInstance.person.lastName).toBe('van Greunen');
    expect(child.componentInstance.greeting).toBe('Good day to you Andreas!');
  });
});
