import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingInPageComponent } from './signin-page.component';

describe('SingInPageComponent', () => {
  let component: SingInPageComponent;
  let fixture: ComponentFixture<SingInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingInPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
