import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsEarthingComponent } from './lps-earthing.component';

describe('LpsEarthingComponent', () => {
  let component: LpsEarthingComponent;
  let fixture: ComponentFixture<LpsEarthingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsEarthingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsEarthingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
