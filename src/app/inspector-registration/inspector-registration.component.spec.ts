import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorRegistrationComponent } from './inspector-registration.component';

describe('InspectorRegistrationComponent', () => {
  let component: InspectorRegistrationComponent;
  let fixture: ComponentFixture<InspectorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
