import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchListComponent } from './movie-search-list.component';

describe('MovieSearchListComponent', () => {
  let component: MovieSearchListComponent;
  let fixture: ComponentFixture<MovieSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
