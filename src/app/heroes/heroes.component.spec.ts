import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let heroes;
  let mockHeroService;

  beforeEach(() => {
    heroes = [
      {id: 1, name: 'SpiderDude', stregth: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55}
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });

  describe('Delete', () => {
    it('Removes hero from the heroes list', () => {
      // Arrange:
      component.heroes = heroes;
      mockHeroService.deleteHero.and.returnValue(of(true));

      // Act:
      component.delete(heroes[2]);

      // Assert:
      expect(component.heroes.length).toBe(2);
      const filteredList = component.heroes.filter(item => item.id !== 3);
      expect(filteredList.length).toBe(2);
    });
  });

  it('should call deleteHero on the service with the deleted hero', () => {
      // Arrange:
      component.heroes = heroes;
      mockHeroService.deleteHero.and.returnValue(of(true));

      // Act:
      component.delete(heroes[2]);

      // Assert:
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
  });

  it('should subscribe to the result of the deleteHero call', () => {
    // Arrange:
    component.heroes = heroes;
    const mockObservable = jasmine.createSpyObj(['subscribe']);
    mockHeroService.deleteHero.and.returnValue(mockObservable);

    // Act:
    component.delete(heroes[2]);

    // Assert:
    expect(mockObservable.subscribe).toHaveBeenCalled();
});

});
