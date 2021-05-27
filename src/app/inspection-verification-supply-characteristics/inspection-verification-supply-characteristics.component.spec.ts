import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionVerificationSupplyCharacteristicsComponent } from './inspection-verification-supply-characteristics.component';

describe('InspectionVerificationSupplyCharacteristicsComponent', () => {
  let component: InspectionVerificationSupplyCharacteristicsComponent;
  let fixture: ComponentFixture<InspectionVerificationSupplyCharacteristicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionVerificationSupplyCharacteristicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionVerificationSupplyCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
