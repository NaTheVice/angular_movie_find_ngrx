import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { MOVIE_DISCOVER_DB_URL, MOVIE_SEARCH_DB_URL } from './api-urls';
import { Movie } from './movie.model';

@Injectable()
export class MoviesService {
  constructor(private http: Http) {}

  public getMovies(pageNumber: number): Observable<Movie[]> {
    return this.http.get(`${MOVIE_DISCOVER_DB_URL}&page=${pageNumber}`)
      .map(this.extractData);
  }

  public searchMovies(query): Observable<Movie[]> {
    console.log('hello from searchMovie');
    return this.http.get(`${MOVIE_SEARCH_DB_URL}&query=${query}`)
      .map(this.extractData);
  }

  private extractData(res: Response): Movie[] {
    const body = res.json();
    console.log('body und body.result ok!');
    return body && body.results ? body.results : [];
  }
}
