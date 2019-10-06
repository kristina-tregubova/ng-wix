import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersSearchComponent } from './players-search.component';

describe('PlayersSearchComponent', () => {
  let component: PlayersSearchComponent;
  let fixture: ComponentFixture<PlayersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
