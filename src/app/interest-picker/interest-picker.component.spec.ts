import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InterestPickerComponent } from './interest-picker.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InterestPickerComponent', () => {
  let component: InterestPickerComponent;
  let fixture: ComponentFixture<InterestPickerComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ InterestPickerComponent ]
    });

    fixture = TestBed.createComponent(InterestPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should output the selected interest', fakeAsync(() => {
    // Arrange:
    let selectedInterest: string;
    let selectElem = fixture.debugElement.query(By.css('select'));
    component.interestChanged.subscribe((interest) => {
      selectedInterest = interest;
    });

    // Act:
    selectElem.nativeElement.value = 'Sport';
    selectElem.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    // tick();

    // Assert (model --> view):
    expect(component.selectedInterest).toBe('Sport');
    expect(selectedInterest).toBe('Sport');
  }));
});
