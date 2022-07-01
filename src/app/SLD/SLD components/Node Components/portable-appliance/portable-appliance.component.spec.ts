import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortableApplianceComponent } from './portable-appliance.component';

describe('PortableApplianceComponent', () => {
  let component: PortableApplianceComponent;
  let fixture: ComponentFixture<PortableApplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortableApplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortableApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
