import { TestBed } from '@angular/core/testing';

import { TransformerServicesService } from './transformer-services.service';

describe('TransformerServicesService', () => {
  let service: TransformerServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformerServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
