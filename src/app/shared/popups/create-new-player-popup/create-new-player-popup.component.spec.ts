import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPlayerPopupComponent } from './create-new-player-popup.component';

describe('CreateNewPlayerPopupComponent', () => {
  let component: CreateNewPlayerPopupComponent;
  let fixture: ComponentFixture<CreateNewPlayerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewPlayerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewPlayerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
