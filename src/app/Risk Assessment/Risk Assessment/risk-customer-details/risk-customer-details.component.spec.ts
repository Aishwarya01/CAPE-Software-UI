import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCustomerDetailsComponent } from './risk-customer-details.component';

describe('RiskCustomerDetailsComponent', () => {
  let component: RiskCustomerDetailsComponent;
  let fixture: ComponentFixture<RiskCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskCustomerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
