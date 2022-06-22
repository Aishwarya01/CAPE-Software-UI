import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RCBOComponent } from './rcbo.component';

describe('RCBOComponent', () => {
  let component: RCBOComponent;
  let fixture: ComponentFixture<RCBOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RCBOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RCBOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
