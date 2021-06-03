import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionVerificationIncomingEquipmentComponent } from './inspection-verification-incoming-equipment.component';

describe('InspectionVerificationIncomingEquipmentComponent', () => {
  let component: InspectionVerificationIncomingEquipmentComponent;
  let fixture: ComponentFixture<InspectionVerificationIncomingEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionVerificationIncomingEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionVerificationIncomingEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
