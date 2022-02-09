import { TestBed } from '@angular/core/testing';

import { EmcClientDetailsService } from './emc-client-details.service';

describe('EmcClientDetailsService', () => {
  let service: EmcClientDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmcClientDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
