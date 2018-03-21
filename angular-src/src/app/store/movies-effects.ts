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
import { combineAll } from 'rxjs/operators/combineAll';

@Injectable()
export class MoviesEffects {
  constructor(private moviesService: MoviesService, private actions$: Actions) {}

  @Effect()
  loadMovies$: Observable<Action> = this.actions$
    .ofType(moviesActions.LOAD_MOVIES)
    .switchMap((laodMoviesAction: LoadMovies) => {
      console.log("hello from load movie");
      return this.moviesService.getNewestMoviesFromGraphql(laodMoviesAction.payload).map((movies: any) => {
          return new moviesActions.LoadingSuccess(movies.data.movies);
        }
      ).catch(error => {
        console.log('error in search-serie-effect' + error);
        return of(new moviesActions.LoadingFails(error));
      });
    }
  );

  @Effect()
  loadSerie$: Observable<Action> = this.actions$.ofType(moviesActions.LOAD_SERIE)
    .switchMap((laodSerieAction: LoadSerie) => {
      console.log("hello from load serie");
      return this.moviesService.getNewestSeriesFromGraphql(laodSerieAction.payload).map((series: any) => {
          console.log("serien: ",series.data.topSeries)
          return new moviesActions.LoadingSuccessSerie(series.data.topSeries);
        }
      ).catch(error => {
        console.log('error in search-serie-effect' + error);
        return of(new moviesActions.LoadingFailsSerie(error));
      });
    }
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
