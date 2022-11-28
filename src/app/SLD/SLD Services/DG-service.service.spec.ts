import { TestBed } from '@angular/core/testing';

import { DGServicesService } from './DG-service.service';

describe('DGServicesService', () => {
  let service: DGServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DGServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
