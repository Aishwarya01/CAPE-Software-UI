import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskFinalReportsComponent } from './risk-final-reports.component';

describe('RiskFinalReportsComponent', () => {
  let component: RiskFinalReportsComponent;
  let fixture: ComponentFixture<RiskFinalReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskFinalReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskFinalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
