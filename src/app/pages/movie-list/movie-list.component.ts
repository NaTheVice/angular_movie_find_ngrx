import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MoviesService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';

import * as moviesReducers from '../../store/movies.reducer';
import * as moviesActions from '../../store/movies-actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  public movieSelected = false;
  public movies$: Observable<Movie[]>;
  public fetchMoreMovies: () => void;
  public postersizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];
  private moviesSubscription: Subscription;
  public sichtbar = [];
  public language_id;
  public overview;

  constructor(private store: Store<moviesReducers.State>, public movieService: MoviesService) {
    this.movies$ = store.select(moviesReducers.getMoviesListState);
    this.fetchMoreMovies = this.loadMoviesPage.bind(this);
  }

  get postersize(): string { return this.postersizes[Math.floor(Math.random() * this.postersizes.length)]; }

  public ngOnInit() {
    this.loadMoviesPage();
  }

  public loadMoviesPage() {
    this.store.dispatch(new moviesActions.LoadMovies());
  }

  public selectMovie(movie: Movie): void {
    this.store.dispatch(new moviesActions.SelectMovie(movie));
    this.movieSelected = true;
  }

  public getOverviewInGerman(id) {
    this.movieService.getOverviewInGerman(id).subscribe(obj => {
    this.overview = obj.overview;
    this.language_id = id;
    });
  }
}
