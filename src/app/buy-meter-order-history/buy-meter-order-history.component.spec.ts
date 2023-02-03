import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMeterOrderHistoryComponent } from './buy-meter-order-history.component';

describe('BuyMeterOrderHistoryComponent', () => {
  let component: BuyMeterOrderHistoryComponent;
  let fixture: ComponentFixture<BuyMeterOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyMeterOrderHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMeterOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
