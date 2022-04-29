import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncSigComponent } from './sync-sig.component';

describe('SyncSigComponent', () => {
  let component: SyncSigComponent;
  let fixture: ComponentFixture<SyncSigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncSigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncSigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
