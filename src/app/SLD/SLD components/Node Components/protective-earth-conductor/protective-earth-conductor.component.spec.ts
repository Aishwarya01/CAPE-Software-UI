import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectiveEarthConductorComponent } from './protective-earth-conductor.component';

describe('ProtectiveEarthConductorComponent', () => {
  let component: ProtectiveEarthConductorComponent;
  let fixture: ComponentFixture<ProtectiveEarthConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectiveEarthConductorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectiveEarthConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
