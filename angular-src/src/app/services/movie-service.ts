import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as moviesActions from '../store/movies-actions';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { MOVIE_DISCOVER_DB_URL, MOVIE_SEARCH_DB_URL, NEWEST_MOVIES, API_KEY, NEWEST_SERIE, MOVIE_BY_PERSON_DISCOVER } from '../models/api';
import { Movie } from '../models/movie.model';
import { Serie } from '../models/serie.model';
import * as moviesReducers from '../store/movies.reducer';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const heute = new Date().toISOString().slice(0, 10);
const monat3Vorher = new Date(
  new Date().getFullYear(),
  new Date().getMonth() - 3,
  new Date().getDate()
);
const monat12Vorher = new Date(
  new Date().getFullYear(),
  new Date().getMonth() - 3,
  new Date().getDate()
);
const vorher3 = new Date(monat3Vorher).toISOString().slice(0, 10);
const vorher12 = new Date(monat12Vorher).toISOString().slice(0, 10);

@Injectable()
export class MoviesService {

  constructor(  private httpClient: HttpClient,
                private store: Store<moviesReducers.State>,
                private apollo: Apollo,
                private httpLink: HttpLink) {

  }

  public getMovies(pageNumber: number): Observable<Movie[]> {
    return this.httpClient
      .get<any>(`${MOVIE_DISCOVER_DB_URL}&page=${pageNumber}`)
      .map(movies => {
        return movies.results;
      });
  }

  public searchMovies(query, page): Observable<Movie[]> {
    console.log('hello from searchMovie');
    return this.httpClient
      .get<any>(`${MOVIE_SEARCH_DB_URL}&query=${query}&page=` + page)
      .map(movies => {
        const total = movies.total_pages;
        this.store.dispatch(new moviesActions.SetTotalPagesSearch(total));
        return movies.results;
      });
  }

  public getPersonMovies(query, page) {
    console.log('hello from searchMovie');
    return this.httpClient
      .get<any>(`${MOVIE_BY_PERSON_DISCOVER}${query}&page=` + page)
      .subscribe(movies => {
        this.store.dispatch(new moviesActions.SetTotalPagesSearch(movies.total_pages));
        this.store.dispatch({
          type: 'SEARCHING_SUCCESS',
          payload: movies.results
        });
      });
  }

  public getOverviewInGerman(id) {
    return this.httpClient
        .get<any>(
          `https://api.themoviedb.org/3/movie/` + id + `?api_key=${API_KEY}&language=de`
        );
  }

  public getSerieOverviewInGerman(id) {
    return this.httpClient
        .get<any>(
          `https://api.themoviedb.org/3/tv/` + id + `?api_key=${API_KEY}&language=de`
        );
  }

  public getNewestMoviesFromGraphql(page) {
    this.apollo.query({query: gql`{movies(page:${page}){total_pages results{id title poster_path overview genre_ids release_date}}}`})
    .subscribe((results: any) => {
      const total = results.data.movies.total_pages;
      this.store.dispatch(new moviesActions.SetTotalPagesNews(total));
        this.store.dispatch({
          type: 'LOADING_SUCCESS',
          payload: results.data.movies.results
        });
    });

  }

  public getNewestMovies(pageNumber: number): Observable<Movie[]> {

    return this.httpClient
      .get<any>(
        `${NEWEST_MOVIES}` +
          vorher3 +
          `&primary_release_date.lte=` +
          heute +
          `&page=${pageNumber}`
      )
      .map(movies => {
        const total = movies.total_pages;
        this.store.dispatch(new moviesActions.SetTotalPagesNews(total));
        return movies.results;
      });
  }

  public getNewestSerie(pageNumber: number): Observable<Serie[]> {
    return this.httpClient
      .get<any>(
        `${NEWEST_SERIE}` +
          vorher12 +
          `&first_air_date.lte=` +
          heute +
          `&page=${pageNumber}`
      )
      .map(serie => {
        const total = serie.total_pages;
        this.store.dispatch(new moviesActions.SetTotalPagesSerie(total));
        return serie.results;
      });
  }

  public getMovieCredits(id) {
    return this.httpClient
      .get<any>(
        `https://api.themoviedb.org/3/movie/` +
          id +
          `/credits?api_key=${API_KEY}`
      )
      .map(movies => {
        return movies.cast;
      });
  }

  public getMoviesWithCredits(movies, loading?) {
    let count = 1;
    movies.forEach(element => {
      this.httpClient
        .get<any>(
          `https://api.themoviedb.org/3/movie/` +
            element.id +
            `/credits?api_key=${API_KEY}`
        )
        .subscribe(credits => {
          element.credits = credits.cast;
          count++;
          if (count === movies.length) {
            if (loading) {
              this.store.dispatch({
                type: 'LOADING_SUCCESS',
                payload: movies
              });
            }
          if (!loading) {
           this.store.dispatch({
              type: 'SEARCHING_SUCCESS',
              payload: movies
            });
          }
          }
        });
    });
  }
}
