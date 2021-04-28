import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteaddComponent } from './siteadd.component';

describe('SiteaddComponent', () => {
  let component: SiteaddComponent;
  let fixture: ComponentFixture<SiteaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
