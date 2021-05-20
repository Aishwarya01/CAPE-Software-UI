import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvInspectionDetailsComponent } from './lv-inspection-details.component';

describe('LvInspectionDetailsComponent', () => {
  let component: LvInspectionDetailsComponent;
  let fixture: ComponentFixture<LvInspectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LvInspectionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LvInspectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
