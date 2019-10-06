import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournosListComponent } from './tournos-list.component';

describe('TournosListComponent', () => {
  let component: TournosListComponent;
  let fixture: ComponentFixture<TournosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
