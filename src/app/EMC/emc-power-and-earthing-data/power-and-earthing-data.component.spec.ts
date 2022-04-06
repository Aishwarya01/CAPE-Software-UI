import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerAndEarthingDataComponent } from './power-and-earthing-data.component';

describe('PowerAndEarthingDataComponent', () => {
  let component: PowerAndEarthingDataComponent;
  let fixture: ComponentFixture<PowerAndEarthingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerAndEarthingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerAndEarthingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
