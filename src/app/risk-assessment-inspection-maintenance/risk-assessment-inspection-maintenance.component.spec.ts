import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAssessmentInspectionMaintenanceComponent } from './risk-assessment-inspection-maintenance.component';

describe('RiskAssessmentInspectionMaintenanceComponent', () => {
  let component: RiskAssessmentInspectionMaintenanceComponent;
  let fixture: ComponentFixture<RiskAssessmentInspectionMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAssessmentInspectionMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskAssessmentInspectionMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
