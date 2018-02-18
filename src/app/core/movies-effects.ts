
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

import { LoadMovies, SearchMovies, SelectMovie, LoadMovieCredits } from './movies-actions';
import { MoviesService } from './movie-service';
import { Movie } from './movie.model';
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
        const secondPage = this.moviesService.getNewestMovies(2);
        const thirdPage = this.moviesService.getNewestMovies(3);
        getMoviesStream = fisrtPage.concat(secondPage).concat(thirdPage);
        this.nextPageToLoad = 3;
      } else {
        getMoviesStream = this.moviesService.getNewestMovies(this.nextPageToLoad);
      }

      return getMoviesStream
        .map((movies: Movie[]) => {
          this.nextPageToLoad++;
          return new moviesActions.LoadingSuccess(movies);
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
            //console.log("movies"+JSON.stringify(movies))
            this.moviesService.getMoviesWithCredits(movies)
            //return new moviesActions.ReadyToSetMovies(true);
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



    @Effect()
    setCredits$: Observable<Action> = this.actions$
      .ofType(moviesActions.LOAD_MOVIE_CREDITS)
      .switchMap((loadMovieCredits: LoadMovieCredits) => {
        if (loadMovieCredits.payload) {
          console.log('selectMovie in effect');
          return this.moviesService.getMovieCredits(loadMovieCredits.payload.id)
            .map((credits) => {
              loadMovieCredits.payload.credits = credits;
              console.log(loadMovieCredits.payload);
              return new moviesActions.SelectMovie (loadMovieCredits.payload);
            })
            .catch(error => {
             console.log('error in search-movie-effect' + error);
              return of(new moviesActions.SearchingFails(error));
            });
        }
      });

  constructor(private actions$: Actions,
    private moviesService: MoviesService,
    ) {}
}
