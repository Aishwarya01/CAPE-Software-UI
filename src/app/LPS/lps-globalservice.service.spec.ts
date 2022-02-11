import { TestBed } from '@angular/core/testing';

import { LpsGlobalserviceService } from './lps-globalservice.service';

describe('LpsGlobalserviceService', () => {
  let service: LpsGlobalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LpsGlobalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
