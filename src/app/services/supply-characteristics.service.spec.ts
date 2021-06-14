import { TestBed } from '@angular/core/testing';

import { SupplyCharacteristicsService } from './supply-characteristics.service';

describe('SupplyCharacteristicsService', () => {
  let service: SupplyCharacteristicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplyCharacteristicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
