import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteupdateComponent } from './siteupdate.component';

describe('SiteupdateComponent', () => {
  let component: SiteupdateComponent;
  let fixture: ComponentFixture<SiteupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
