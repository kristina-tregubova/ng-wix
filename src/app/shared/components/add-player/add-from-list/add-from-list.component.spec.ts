import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFromListComponent } from './add-from-list.component';

describe('AddFromListComponent', () => {
  let component: AddFromListComponent;
  let fixture: ComponentFixture<AddFromListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFromListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFromListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
