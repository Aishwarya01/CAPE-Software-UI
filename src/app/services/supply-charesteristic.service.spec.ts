import { TestBed } from '@angular/core/testing';
import { SupplyCharesteristic } from '../model/supplycharesteristic';

import { SupplyCharesteristicService} from './supply-charesteristic.service';

describe('SupplyCharesteristicService', () => {
  let service: SupplyCharesteristicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplyCharesteristicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
