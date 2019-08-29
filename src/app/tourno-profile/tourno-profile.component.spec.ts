import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoProfileComponent } from './tourno-profile.component';

describe('TournoProfileComponent', () => {
  let component: TournoProfileComponent;
  let fixture: ComponentFixture<TournoProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournoProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
