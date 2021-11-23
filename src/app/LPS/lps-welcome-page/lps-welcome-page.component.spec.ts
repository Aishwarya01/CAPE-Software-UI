import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsWelcomePageComponent } from './lps-welcome-page.component';

describe('LpsWelcomePageComponent', () => {
  let component: LpsWelcomePageComponent;
  let fixture: ComponentFixture<LpsWelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsWelcomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsWelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
