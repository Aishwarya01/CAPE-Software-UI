import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsAirTerminationComponent } from './lps-air-termination.component';

describe('LpsAirTerminationComponent', () => {
  let component: LpsAirTerminationComponent;
  let fixture: ComponentFixture<LpsAirTerminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsAirTerminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsAirTerminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
