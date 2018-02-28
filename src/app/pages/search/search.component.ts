import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import { Subject, Subscription } from 'rxjs/Rx';


import { Movie } from '../../models/movie.model';

import * as moviesReducers from '../../store/movies.reducer';
import * as moviesActions from '../../store/movies-actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public query = '';
  public movies$: Observable<Movie[]>;
  public cursorInsideInput = false;

  private searchTermStream = new Subject<string>();
  private searchSubscription: Subscription;

  constructor(private store: Store<moviesReducers.State>, private router: Router) {
    this.movies$ = store.select(moviesReducers.getSearchMoviesListState);
  }

  public ngOnInit() {
    this.searchSubscription = this.searchTermStream
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(query => {
        this.store.dispatch(new moviesActions.SearchMovies(query));
      });
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  public queryChanged(): void {
    this.searchTermStream.next(this.query);
  }

  public selectMovie(movie: Movie): void {
    this.store.dispatch(new moviesActions.SelectMovie(movie));
  }

  public onFocus(): void {
    this.cursorInsideInput = true;
  }

  public onBlur(): void {
    this.cursorInsideInput = false;
  }

}

