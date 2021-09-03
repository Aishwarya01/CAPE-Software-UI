import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenselistComponent } from './licenselist.component';

describe('LicenselistComponent', () => {
  let component: LicenselistComponent;
  let fixture: ComponentFixture<LicenselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
