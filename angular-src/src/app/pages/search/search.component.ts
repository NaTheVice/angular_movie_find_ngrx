import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import { Subject, Subscription } from 'rxjs/Rx';

import { Movie } from '../../models/movie.model';

import * as moviesReducers from '../../store/movies.reducer';
import * as moviesActions from '../../store/movies-actions';
import { MoviesService } from '../../services/movie-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public query = '';
  public movies$: Observable<Movie[]>;
  public cursorInsideInput = false;
  public open = false;
  private searchTermStream = new Subject<string>();
  private searchSubscription: Subscription;

  constructor(
    private store: Store<moviesReducers.State>,
    private router: Router,
    private movieService: MoviesService
  ) {
    this.movies$ = store.select(moviesReducers.getSearchMoviesListState);
  }

  public ngOnInit() {
    this.searchSubscription = this.searchTermStream
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(query => {
        this.store.dispatch(new moviesActions.SearchMovies(query, 1));
      });
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  public queryChanged(): void {
    this.searchTermStream.next(this.query);
  }

  public selectMovie(movie: Movie): void {
    if (movie.media_type !== 'person') {
      this.query = movie.title || movie.name;
      this.store.dispatch(new moviesActions.SearchMovies(this.query, 1));
      this.store.dispatch(new moviesActions.SelectMovie(movie));
    } else {
      this.query = '';
      this.movieService.getPersonMovies(movie.id, 1);
    }
  }

  public onFocus(): void {
    this.cursorInsideInput = true;
  }

  public onBlur(): void {
    this.cursorInsideInput = false;
    this.open = false;
  }

  public goToSearch() {
    this.router.navigate(['search']);
  }
}
