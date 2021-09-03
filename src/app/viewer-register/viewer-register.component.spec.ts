import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerRegisterComponent } from './viewer-register.component';

describe('ViewerRegisterComponent', () => {
  let component: ViewerRegisterComponent;
  let fixture: ComponentFixture<ViewerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
