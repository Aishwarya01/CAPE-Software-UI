import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfieBuyMeterComponent } from './profie-buy-meter.component';

describe('ProfieBuyMeterComponent', () => {
  let component: ProfieBuyMeterComponent;
  let fixture: ComponentFixture<ProfieBuyMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfieBuyMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfieBuyMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
