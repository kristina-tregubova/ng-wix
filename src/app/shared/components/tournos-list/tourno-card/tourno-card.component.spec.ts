import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoCardComponent } from './tourno-card.component';

describe('TournoCardComponent', () => {
  let component: TournoCardComponent;
  let fixture: ComponentFixture<TournoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
