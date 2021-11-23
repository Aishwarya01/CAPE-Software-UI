import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpsBasicPageComponent } from './lps-basic-page.component';

describe('LpsBasicPageComponent', () => {
  let component: LpsBasicPageComponent;
  let fixture: ComponentFixture<LpsBasicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpsBasicPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpsBasicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
