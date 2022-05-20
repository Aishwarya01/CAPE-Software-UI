import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskSavedReportsComponent } from './risk-saved-reports.component';

describe('RiskSavedReportsComponent', () => {
  let component: RiskSavedReportsComponent;
  let fixture: ComponentFixture<RiskSavedReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskSavedReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskSavedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
