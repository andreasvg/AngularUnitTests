import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  mockMessageService = jasmine.createSpyObj(['add']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService}
      ]
    });

    // get a handle to the HttpTestingController and HeroService from the dependency injection mechanism:
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  describe('GetHero', () => {
    it('should call get with the correct URL', () => {
      // Act:
      service.getHero(4).subscribe();

      // Assert:
      // configure the mock Http service to expect a call to a given URL:
      const req = httpTestingController.expectOne('api/heroes/4');

      // configure the mock Http service to return some test data:
      req.flush({id: 4, name: 'SuperDude', strength: 100});

      // check that the service was called with ONLY the calls that we expected:
      httpTestingController.verify();
    });
  });

  it('should return undefined when the server returns a 404', () => {
    let response: any;
    let errResponse: any;

    // Act:
    service.getHero(4000).subscribe(res => response = res, err => errResponse = err);

    // configure the mock Http service to return a 404:
    const req = httpTestingController.expectOne('api/heroes/4000');
    const mockErrorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    req.flush('', mockErrorResponse);

    // Assert:
    expect(response).toBe(undefined);
    console.log(errResponse);
  });

});


/*   describe('GetHero', () => {
    it('should call get with the correct URL',
    inject([HeroService, HttpTestingController],
      (service: HeroService, controller: HttpTestingController) => {
        service.getHero(4).subscribe();
    }));
  }); */
