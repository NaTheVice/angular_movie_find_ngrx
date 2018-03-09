import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MoviesService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';

import * as moviesReducers from '../../store/movies.reducer';
import * as moviesActions from '../../store/movies-actions';
import { getTotalPages } from '../../store/movies.reducer';
import { genres } from '../../models/all-movie-genres.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  public movieSelected = false;
  public movies$: Observable<Movie[]>;
  public fetchMoreMovies: () => void;
  public postersizes = [
    'w92',
    'w154',
    'w185',
    'w342',
    'w500',
    'w780',
    'original'
  ];

  public sichtbar = [];
  public language_id;
  public overview;
  private movieSubscription: Subscription;
  private pagesSubscription: Subscription;
  public p = 1;
  public totalPages;
  public loading;

  constructor(
    private store: Store<moviesReducers.State>,
    public movieService: MoviesService
  ) {
    this.movies$ = store.select(moviesReducers.getMoviesListState);
    this.fetchMoreMovies = this.loadMoviesPage.bind(this);
    this.loadMoviesPage(1);
  }

  get postersize(): string {
    return this.postersizes[
      Math.floor(Math.random() * this.postersizes.length)
    ];
  }

  public ngOnInit() {
    this.movieSubscription = this.store
      .select(moviesReducers.getSelectedMovie)
      .subscribe((movie: Movie) => {
        if (!movie) {
          this.movieSelected = false;
        } else {
          this.movieSelected = true;
        }
      });
    this.pagesSubscription = this.store
      .select(moviesReducers.getTotalPages)
      .subscribe(pages => {
        if (!pages) {
          this.totalPages = 0;
        } else {
          this.totalPages = pages;
        }
      });
  }

  public loadMoviesPage(page: number) {
    this.store.dispatch(new moviesActions.LoadMovies(page));
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

  public getPage(page: number) {
    this.loading = true;
    this.p = page;
    this.loadMoviesPage(page);
  }

  public getGenre(id) {
    const genre = genres.find(x => x.id === id);
    if (genre !== undefined) {
      return genre.name;
    }
    if (id !== undefined) {
      const genrename = 'Genre: ' + id;
      return genrename;
    }
  }
}
