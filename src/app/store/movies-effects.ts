import { Router } from '@angular/router/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concat';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import { LoadMovies, SearchMovies, SelectMovie, LoadMovieCredits, LoadingSuccess } from './movies-actions';
import { MoviesService } from '../services/movie-service';
import { Movie } from '../models/movie.model';
import * as moviesActions from './movies-actions';

@Injectable()
export class MoviesEffects {

  private nextPageToLoad = 1;

  @Effect()
  loadMovies$: Observable<Action> = this.actions$
    .ofType(moviesActions.LOAD_MOVIES)
    .switchMap((loadMoviesAction: LoadMovies) => {
      let getMoviesStream: Observable<Movie[]>;
      if (this.nextPageToLoad < 3) {
        const fisrtPage = this.moviesService.getNewestMovies(1);
        //const secondPage = this.moviesService.getNewestMovies(2);
        //const thirdPage = this.moviesService.getNewestMovies(3);
        getMoviesStream = fisrtPage;
        this.nextPageToLoad = 1;
      } else {
        getMoviesStream = this.moviesService.getNewestMovies(this.nextPageToLoad);
      }

      return getMoviesStream
        .map((movies: Movie[]) => {
          this.nextPageToLoad++;
          this.moviesService.getMoviesWithCredits(movies, true);
          return new moviesActions.LoadingSuccess([]);
        })
        .catch(error => {
          console.log('error in get-moviesStream-effect' + error);
          return of(new moviesActions.LoadingFails(error));
        });
    });

  @Effect()
  searchMovies$: Observable<Action> = this.actions$
    .ofType(moviesActions.SEARCH_MOVIES)
    .switchMap((searchMoviesAction: SearchMovies) => {
      if (searchMoviesAction.payload) {
        console.log('searchMovieAction in effect');
        return this.moviesService.searchMovies(searchMoviesAction.payload)
          .map((movies: Movie[]) => {
            this.moviesService.getMoviesWithCredits(movies);
            return new moviesActions.SearchingSuccess([]);
          })
          .catch(error => {
           console.log('error in search-movie-effect' + error);
            return of(new moviesActions.SearchingFails(error));
          });
      } else {
        console.log('search movies is empty');
        return Observable.of(new moviesActions.SearchingSuccess([]));
      }
    });

  constructor(private actions$: Actions,
    private moviesService: MoviesService,
    ) {}
}
