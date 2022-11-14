import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMeterComponent } from './buy-meter.component';

describe('BuyMeterComponent', () => {
  let component: BuyMeterComponent;
  let fixture: ComponentFixture<BuyMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
