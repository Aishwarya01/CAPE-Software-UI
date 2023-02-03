import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthingCableConnnectorComponent } from './earthing-cable-connnector.component';

describe('EarthingCableConnnectorComponent', () => {
  let component: EarthingCableConnnectorComponent;
  let fixture: ComponentFixture<EarthingCableConnnectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarthingCableConnnectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarthingCableConnnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
