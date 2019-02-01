import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeroComponent } from '../hero/hero.component';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', stregth: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55}
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkStubDirective],
      providers: [
        { provide: HeroService, useValue: mockHeroService}
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    // Arrange:
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // Act (run ngOnInit):
    fixture.detectChanges();

    // Assert:
    const heroElems = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroElems.length).toEqual(3);

    for (let i = 0; i < heroElems.length; i++) {
      expect(heroElems[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`should call delete() on HeroesComponent when the hero component's
      delete button is clicked`, () => {
        /* This test interrogate's the child component's HTML and fires the click()
        event */

        // Arrange:
        // find the delete method on our Heroes component and just watch it:
        spyOn(fixture.componentInstance, 'delete');

        // set up our mock service to return some dummy data:
        mockHeroService.deleteHero.and.returnValue(of(true));
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        // get a handle to all of the child Hero components:
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // Act:
        // raise the event by finding the child's button and triggering the click event:
        heroComponents[0].query(By.css('button'))
          .triggerEventHandler('click', { stopPropagation: () => {}});

        // Assert:
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should call delete() on HeroesComponent when the hero component's
      delete event is emitted`, () => {
        // Arrange:
        // find the delete method on our Heroes component and just watch it:
        spyOn(fixture.componentInstance, 'delete');

        // set up our mock service to return some dummy data:
        mockHeroService.deleteHero.and.returnValue(of(true));
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        // get a handle to all of the child Hero components:
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // Act:
        // raise the event by finding the child's button and triggering the click event:
        // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
        heroComponents[0].triggerEventHandler('delete', null);

        // Assert:
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });


  it(`should call heroService.deleteHero() when the hero component's
  delete button is clicked`, () => {
    // Arrange:
    // set up our mock service to return some dummy data:
    mockHeroService.deleteHero.and.returnValue(of(true));
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // get a handle to all of the child Hero components:
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    // Act:
    // raise the event by finding the child's button and triggering the click event:
    heroComponents[0].query(By.css('button'))
      .triggerEventHandler('click', { stopPropagation: () => {}});

    // Assert:
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the list when the add button is clicked', () => {
    // Arrange:
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
    // get a reference to the input box's underlying DOM element:
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    // Act:
    inputElement.value = name;  // simulate typing into input box
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert:
    // Check if the list in the component class contains the newly added hero.
    // Approach 1: check the parent's component variable:
    let foundHero: boolean;
    foundHero = fixture.componentInstance.heroes.filter(h => h.name === name).length > 0;
    expect(foundHero).toBe(true);

    // Approach 2: check that the component's HTML includes the newly added hero:
    const heroElems = fixture.debugElement.queryAll(By.directive(HeroComponent));
    const item = heroElems.filter(he => he.componentInstance.hero.name === name);
    expect(item).toBeTruthy();

    // Approach 3: - check the contents of the UL:
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it('should have the correct route for the first hero', () => {
    // Arrange:
    // configure our mock service response:
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // get a list of HeroComponents:
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    // from the first HeroComponent
    const routerLink = heroComponents[0]
      // get the element containing the RouterLinkStubDirective
      .query(By.directive(RouterLinkStubDirective))
      // and get a handle to the directive itself
      .injector.get(RouterLinkStubDirective);

    // Act:
    // click the <a> tag on the first hero
    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    // Assert:
    // check that the navigated to URL is correct
    expect(routerLink.navigatedTo).toBe('/detail/1');
    fixture.detectChanges();
  });
});

