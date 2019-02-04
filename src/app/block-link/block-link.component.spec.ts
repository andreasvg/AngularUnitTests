import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLinkComponent } from './block-link.component';
import { Directive, Input, PipeTransform, Pipe, HostListener } from '@angular/core';
import { By } from '@angular/platform-browser';

@Directive({
  selector: '[routerLink]'
})
class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Pipe({
  name: 'strength'
})
class MockStrengthPipe implements PipeTransform {
  transform(value: number): string {
    return value.toString();
  }
}

describe('BlockLinkComponent', () => {
  let component: BlockLinkComponent;
  let fixture: ComponentFixture<BlockLinkComponent>;
  const HERO = {id: 2, name: 'John Wayne', strength: 90};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BlockLinkComponent,
        RouterLinkStubDirective,
        MockStrengthPipe
      ]
    });

    fixture = TestBed.createComponent(BlockLinkComponent);
    component = fixture.componentInstance;
    component.hero = HERO;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply highlight property on mouseenter', () => {
    // Arrange:
    expect(component.highlighted).toBeFalsy();

    // Act:
    fixture.debugElement.query(By.css('a')).triggerEventHandler('mouseenter', { type: 'mouseenter'});
    fixture.detectChanges();

    // Assert:
    expect(component.highlighted).toBe(true);
  });

  it('should apply highlight CSS class on mouseenter', () => {
    // Arrange:
    let divElem = fixture.debugElement.query(By.css('div'));
    expect(divElem.classes['highlight']).toBeFalsy();
    expect(component.highlighted).toBeFalsy();

    // Act:
    fixture.debugElement.query(By.css('a')).triggerEventHandler('mouseenter', { type: 'mouseenter'});
    fixture.detectChanges();

    // Assert:
    expect(divElem.classes['highlight']).toBeTruthy();
  });

  it('should remove the highlight CSS class on mouseleave', () => {
    // Arrange:
    let divElem = fixture.debugElement.query(By.css('div')).nativeElement;
    fixture.componentInstance.highlighted = true;
    fixture.detectChanges();
    expect(divElem.classList).toContain('highlight');

    // Act:
    fixture.debugElement.query(By.css('a')).triggerEventHandler('mouseleave', { type: 'mouseleave'});
    fixture.detectChanges();

    // Assert:
    expect(divElem.classList.contains('highlight')).toBe(false);
  });
});
