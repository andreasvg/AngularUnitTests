import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero',
  template: '<div></div>'
})
export class HeroComponent {
  @Input() hero: Hero;
  // @Output() delete = new EventEmitter();

  onDeleteClick($event): void {
    $event.stopPropagation();
  }
}

describe('(TestBed Experiments) HeroesComponent', () => {
  let mockHeroService;
  let HEROES = [];
  let fixture: ComponentFixture<HeroesComponent>;




  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', stregth: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55}
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes']);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{
        provide: HeroService,
        useValue: mockHeroService
      }],
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should fetch heroes when loaded', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });
});
