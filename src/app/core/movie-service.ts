import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
// tslint:disable-next-line:import-blacklist
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import * as moviesActions from './movies-actions';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import {
  MOVIE_DISCOVER_DB_URL,
  MOVIE_SEARCH_DB_URL,
  NEWEST_MOVIES,
  API_KEY
} from "./api-urls";
import { Movie } from "./movie.model";
import { HttpClient } from "@angular/common/http";
import * as moviesReducers from './movies.reducer';

interface cast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number | null;
  id: number;
  name: string;
  order: number;
  profile_path: string | null;
}

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
    console.log("hello from searchMovie");
    return this.http
      .get(`${MOVIE_SEARCH_DB_URL}&query=${query}`)
      .map(this.extractData)
  }

  public extractData(res: Response): Movie[] {
    const body = res.json();
    return body && body.results ? body.results : [];
  }

  private extractCastArray(res: Response): Array<any> {
    const body = res.json();
    console.log("huuhuhuhuuh");
    return body.cast ? body.cast : [];
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

  public getMoviesWithCredits(movies) {
    let count = 1;
    movies.forEach(element => {
      console.log(element.id);
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
            //console.log("this movies " +JSON.stringify(this.movies));
           this.store.dispatch({
              type: 'SEARCHING_SUCCESS',
              payload: movies
            });
            //return of(new moviesActions.SearchingSuccess(movies));
          }
        });
    });
  }
}
