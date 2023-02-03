import { TestBed } from '@angular/core/testing';

import { EarthCableConnectorService } from './earth-cable-connector.service';

describe('EarthCableConnectorService', () => {
  let service: EarthCableConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EarthCableConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
