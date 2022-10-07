import { TestBed } from '@angular/core/testing';

import { LightServicesService } from './light-services.service';

describe('LightServicesService', () => {
  let service: LightServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
