import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsMatstepperComponent } from './lps-matstepper.component';

describe('LpsMatstepperComponent', () => {
  let component: LpsMatstepperComponent;
  let fixture: ComponentFixture<LpsMatstepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsMatstepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsMatstepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
