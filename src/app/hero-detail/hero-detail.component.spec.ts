import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { By } from 'selenium-webdriver';
import { FormsModule } from '@angular/forms';
import { timeout } from 'q';

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockHeroService, mockLocation, mockActivatedRoute;

    beforeEach(() => {
      mockActivatedRoute = {
        snapshot: {
          paramMap: {
            get: () => { return '3'; }
          }
        }
      };
      mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
      mockLocation = jasmine.createSpyObj(['back']);

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HeroDetailComponent],
        providers: [
          { provide: Location, useValue: mockLocation },
          { provide: HeroService, useValue: mockHeroService },
          { provide: ActivatedRoute, useValue: mockActivatedRoute }
        ]
      });

      fixture = TestBed.createComponent(HeroDetailComponent);

      mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 55}));
    });

    it('should render hero name in a h2 tag', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });

    /* Simple async testing using the Jasmine callback function */
    it('should call updateHero when save is called V1', (done) => {
      // Arrange:
      mockHeroService.updateHero.and.returnValue(of({}));
      fixture.detectChanges();

      // Act:
      fixture.componentInstance.save();

      // Assert:
      setTimeout(() => {
        expect(mockHeroService.updateHero).toHaveBeenCalled();
        done();
      }, 300);  // wait 300 ms
    });

    /* using Angular's fakeAsyc helper function */
    it('should call updateHero when save is called V2', fakeAsync(() => {
      // Arrange:
      mockHeroService.updateHero.and.returnValue(of({}));
      fixture.detectChanges();

      // Act:
      fixture.componentInstance.save();
      tick(250);

      // Assert:
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));

    /* using Angular's async helper function in order to deal with promises */
    fit('should call updateHero when save is called V2', async(() => {
      // Arrange:
      mockHeroService.updateHero.and.returnValue(of({}));
      fixture.detectChanges();

      // Act:
      fixture.componentInstance.save2();

      // Assert:
      fixture.whenStable().then(() => {
        expect(mockHeroService.updateHero).toHaveBeenCalled();
      });
    }));

});
