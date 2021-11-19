import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsFinalReportComponent } from './lps-final-report.component';

describe('LpsFinalReportComponent', () => {
  let component: LpsFinalReportComponent;
  let fixture: ComponentFixture<LpsFinalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsFinalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsFinalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
