import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoCreationComponent } from './tourno-creation.component';

describe('TournoCreationComponent', () => {
  let component: TournoCreationComponent;
  let fixture: ComponentFixture<TournoCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournoCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
