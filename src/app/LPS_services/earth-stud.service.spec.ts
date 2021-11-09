import { TestBed } from '@angular/core/testing';

import { EarthStudService } from './earth-stud.service';

describe('EarthStudService', () => {
  let service: EarthStudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EarthStudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
