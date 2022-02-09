import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmcClientDetailsComponent } from './emc-client-details.component';

describe('EmcClientDetailsComponent', () => {
  let component: EmcClientDetailsComponent;
  let fixture: ComponentFixture<EmcClientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmcClientDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmcClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
