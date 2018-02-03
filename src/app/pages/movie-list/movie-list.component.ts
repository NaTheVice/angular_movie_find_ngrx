import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MoviesService } from '../../core/movie-service';
import { Movie } from '../../core//movie.model';

import * as moviesReducers from '../../core/movies.reducer';
import * as moviesActions from '../../core/movies-actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public movies$: Observable<Movie[]>;
  public fetchMoreMovies: () => void;

  private moviesSubscription: Subscription;

  constructor(private store: Store<moviesReducers.State>) { 
    //this.movies$ = store.select(moviesReducers.getMoviesListState);
    this.movies$ = store.select(moviesReducers.getSearchMoviesListState);
    this.fetchMoreMovies = this.loadMoviesPage.bind(this);
  }

  public ngOnInit() {
    this.loadMoviesPage();
  }

  public loadMoviesPage() {
    this.store.dispatch(new moviesActions.LoadMovies());
  }

  public selectMovie(movie: Movie): void {
    this.store.dispatch(new moviesActions.SelectMovie(movie));
    
  }
}
