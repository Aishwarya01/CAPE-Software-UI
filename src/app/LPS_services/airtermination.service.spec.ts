import { TestBed } from '@angular/core/testing';

import { AirterminationService } from './airtermination.service';

describe('AirterminationService', () => {
  let service: AirterminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirterminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
