import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACBComponent } from './acb.component';

describe('ACBComponent', () => {
  let component: ACBComponent;
  let fixture: ComponentFixture<ACBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ACBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ACBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
