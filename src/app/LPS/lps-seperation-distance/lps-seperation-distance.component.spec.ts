import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsSeperationDistanceComponent } from './lps-seperation-distance.component';

describe('LpsSeperationDistanceComponent', () => {
  let component: LpsSeperationDistanceComponent;
  let fixture: ComponentFixture<LpsSeperationDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsSeperationDistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsSeperationDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
