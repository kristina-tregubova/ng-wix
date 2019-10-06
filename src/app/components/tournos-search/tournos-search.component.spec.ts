import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoSearchComponent } from './tournos-search.component';

describe('TournoSearchComponent', () => {
  let component: TournoSearchComponent;
  let fixture: ComponentFixture<TournoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
