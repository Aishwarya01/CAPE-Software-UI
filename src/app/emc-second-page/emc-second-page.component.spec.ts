import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmcSecondPageComponent } from './emc-second-page.component';

describe('EmcSecondPageComponent', () => {
  let component: EmcSecondPageComponent;
  let fixture: ComponentFixture<EmcSecondPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmcSecondPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmcSecondPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
