import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService2', () => {
  let mockMessageService;

  mockMessageService = jasmine.createSpyObj(['add']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService}
      ]
    });
  });

  describe('GetHero', () => {
    it('should call get with the correct URL',
    inject([HeroService, HttpTestingController],
      (service: HeroService, controller: HttpTestingController) => {

      service.getHero(4).subscribe();

      // Assert:
      // configure the mock Http service to expect a call to a given URL:
      const req = controller.expectOne('api/heroes/4');

      // configure the mock Http service to return some test data:
      req.flush({id: 4, name: 'SuperDude', strength: 100});

      // check that the service was called with ONLY the calls that we expected:
      controller.verify();
    }));
  });

});


