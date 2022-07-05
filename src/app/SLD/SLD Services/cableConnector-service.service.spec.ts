import { TestBed } from '@angular/core/testing';

import { CableConnectorServicesService } from './cableConnector-service.service';

describe('CableConnectorServicesService', () => {
  let service: CableConnectorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CableConnectorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
