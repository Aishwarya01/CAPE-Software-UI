import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmcElectromagneticCompatibilityDataComponent } from './emc-electromagnetic-compatibility-data.component';

describe('EmcElectromagneticCompatibilityDataComponent', () => {
  let component: EmcElectromagneticCompatibilityDataComponent;
  let fixture: ComponentFixture<EmcElectromagneticCompatibilityDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmcElectromagneticCompatibilityDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmcElectromagneticCompatibilityDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
