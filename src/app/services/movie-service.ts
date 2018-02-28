import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as moviesActions from '../store/movies-actions';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { MOVIE_DISCOVER_DB_URL, MOVIE_SEARCH_DB_URL, NEWEST_MOVIES, API_KEY } from '../models/api';
import { Movie } from '../models/movie.model';
import * as moviesReducers from '../store/movies.reducer';


const heute = new Date().toISOString().slice(0, 10);
const monatVorher = new Date(
  new Date().getFullYear(),
  new Date().getMonth() - 1,
  new Date().getDate()
);
const vorher = new Date(monatVorher).toISOString().slice(0, 10);

@Injectable()
export class MoviesService {
  public movies: Movie[] = [];
  constructor(private http: Http, private httpClient: HttpClient, private store: Store<moviesReducers.State>) {}

  public getMovies(pageNumber: number): Observable<Movie[]> {

    return this.http
      .get(`${MOVIE_DISCOVER_DB_URL}&page=${pageNumber}`)
      .map(this.extractData);
  }

  public searchMovies(query): Observable<Movie[]> {
    console.log('hello from searchMovie');
    return this.http
      .get(`${MOVIE_SEARCH_DB_URL}&query=${query}`)
      .map(this.extractData);
  }

  public extractData(res: Response): Movie[] {
    const body = res.json();
    return body && body.results ? body.results : [];
  }

  private extractCastArray(res: Response): Array<any> {
    const body = res.json();
    return body.cast ? body.cast : [];
  }

  public getOverviewInGerman(id) {
    return this.httpClient
        .get<any>(
          `https://api.themoviedb.org/3/movie/` + id + `?api_key=${API_KEY}&language=de`
        );
  }

  public getNewestMovies(pageNumber: number): Observable<Movie[]> {
    return this.http
      .get(
        `${NEWEST_MOVIES}` +
          vorher +
          `&primary_release_date.lte=` +
          heute +
          `&page=${pageNumber}`
      )
      .map(this.extractData);
  }

  public getMovieCredits(id) {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/` +
          id +
          `/credits?api_key=${API_KEY}`
      )
      .map(this.extractCastArray);
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
            this.movies = movies;
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
