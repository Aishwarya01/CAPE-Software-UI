import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsSavedReportComponent } from './lps-saved-report.component';

describe('LpsSavedReportComponent', () => {
  let component: LpsSavedReportComponent;
  let fixture: ComponentFixture<LpsSavedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsSavedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsSavedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
