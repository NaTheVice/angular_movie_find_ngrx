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

import {
  LoadMovies,
  SearchMovies,
  SelectMovie,
  LoadMovieCredits,
  LoadingSuccess,
  LoadSerie
} from './movies-actions';
import { MoviesService } from '../services/movie-service';
import { Movie } from '../models/movie.model';
import { Serie } from '../models/serie.model';
import * as moviesActions from './movies-actions';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class MoviesEffects {
  constructor(private moviesService: MoviesService, private actions$: Actions) {}

  @Effect()
  loadMovies$: Observable<Action> = this.actions$
    .ofType(moviesActions.LOAD_MOVIES)
    .switchMap((loadMoviesAction: LoadMovies) => {
      let getMoviesStream: Observable<Movie[]>;
      if (loadMoviesAction.payload) {
        const pages = this.moviesService.getNewestMovies(
          loadMoviesAction.payload
        );
        getMoviesStream = pages;
      }
      return getMoviesStream
        .map((movies: Movie[]) => {
          // this.moviesService.getMoviesWithCredits(movies, true);
          return new moviesActions.LoadingSuccess(movies);
        })
        .catch(error => {
          console.log('error in get-moviesStream-effect' + error);
          return of(new moviesActions.LoadingFails(error));
        });
    });

  @Effect()
  loadSerie$: Observable<Action> = this.actions$.ofType(moviesActions.LOAD_SERIE)
    .pipe(switchMap((laodSerieAction: LoadSerie) => {
      return this.moviesService.getNewestSerie(laodSerieAction.payload).pipe(
        map(series => new moviesActions.LoadingSuccessSerie(series)),
        catchError(error =>  of(new moviesActions.LoadingFailsSerie(error)))
      );
    })
  );


  @Effect()
  searchMovies$: Observable<Action> = this.actions$
    .ofType(moviesActions.SEARCH_MOVIES)
    .switchMap((searchMoviesAction: SearchMovies) => {
      if (searchMoviesAction.payload) {
        return this.moviesService
          .searchMovies(searchMoviesAction.payload, searchMoviesAction.page )
          .map((movies: Movie[]) => {
            // this.moviesService.getMoviesWithCredits(movies);
            return new moviesActions.SearchingSuccess(movies);
          })
          .catch(error => {
            console.log('error in search-movie-effect' + error);
            return of(new moviesActions.SearchingFails(error));
          });
      } else {
        return Observable.of(new moviesActions.SearchingSuccess([]));
      }
    });

}
