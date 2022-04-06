import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmcFacilityDataComponent } from './emc-facility-data.component';

describe('EmcFacilityDataComponent', () => {
  let component: EmcFacilityDataComponent;
  let fixture: ComponentFixture<EmcFacilityDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmcFacilityDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmcFacilityDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
