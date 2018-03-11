import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MoviesService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';

import * as moviesReducers from '../../store/movies.reducer';
import * as moviesActions from '../../store/movies-actions';
import { genres } from '../../models/all-movie-genres.model';

@Component({
  selector: 'app-movie-search-list',
  templateUrl: './movie-search-list.component.html',
  styleUrls: ['./movie-search-list.component.scss']
})
export class MovieSearchListComponent implements OnInit {
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
  public language_id = 0;
  public overview;
  private movieSubscription: Subscription;
  private pagesSubscription: Subscription;
  private querySubscription: Subscription;
  private personSubscription: Subscription;
  public p = 1;
  public totalPages;
  public loading;
  public query;
  public person_id;
  public totalPages$: Observable<number>;

  constructor(
    private store: Store<moviesReducers.State>,
    public movieService: MoviesService
  ) {
    this.movies$ = store.select(moviesReducers.getSearchMoviesListState);
    this.totalPages$ = store.select(moviesReducers.getTotalPagesSearch);
  }

  public ngOnInit() {
    this.querySubscription = this.store
      .select(moviesReducers.getSearchQuery)
      .subscribe(query => {
        if (!(query.length > 0) || query === '') {
          this.query = '';
          this.totalPages = 0;
        } else {
          this.query = query;
        }
      });
    this.pagesSubscription = this.store
      .select(moviesReducers.getTotalPagesSearch)
      .subscribe(pages => {
        if (!pages) {
          this.totalPages = 0;
        } else {
          this.totalPages = pages;
        }
      });
      this.personSubscription = this.store
      .select(moviesReducers.getPersonId)
      .subscribe(person_id => {
        if (!person_id) {
          this.person_id = 0;
        } else {
          this.person_id = person_id;
        }
      });
    this.movieSubscription = this.store
      .select(moviesReducers.getSelectedMovie)
      .subscribe((movie: Movie) => {
        if (!movie) {
          this.movieSelected = false;
        } else {
          this.movieSelected = true;
        }
      });
  }

  public loadMoviesPage(page: number) {
    this.store.dispatch(new moviesActions.SearchMovies(this.query, page));
  }

  public selectMovie(movie: Movie): void {
    this.store.dispatch(new moviesActions.SelectMovie(movie));
    this.movieSelected = true;
  }

  public searchPersonMovie(id, page): void {
    this.movieService.getPersonMovies(id, page);
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
    if (this.person_id !== 0) {
      this.searchPersonMovie(this.person_id, page);
    } else {
      this.loadMoviesPage(page);
    }
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
