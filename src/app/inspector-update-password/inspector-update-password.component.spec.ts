import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorUpdatePasswordComponent } from './inspector-update-password.component';

describe('InspectorUpdatePasswordComponent', () => {
  let component: InspectorUpdatePasswordComponent;
  let fixture: ComponentFixture<InspectorUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectorUpdatePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
