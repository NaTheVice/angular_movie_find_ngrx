import {Action} from '@ngrx/store';
import {Movie} from './movie.model';

export const GET_MOVIE = 'GET_MOVIE';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const LOAD_MOVIES = 'LOAD_MOVIES';
export const GET_MOVIE_GENRE = 'GET_MOVIE_GENRE';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const SET_MOVIE_LIST = 'SET_MOVIES_LIST';
export const SET_PAGE = 'PAGE';
export const SELECT_MOVIE = 'SELECT_MOVIE';
export const SELECT_GENRE = 'SELECT_GENRE';
export const LOADING_SUCCESS = 'LOADING_SUCCESS';
export const LOADING_FAILS = 'LOADING_FAILS';
export const SEARCHING_SUCCESS = 'SEARCHING_SUCCESS';
export const SEARCHING_FAILS = 'SEARCHING_FAILS';

export class GetMovie implements Action {
    readonly type = GET_MOVIE;
    constructor(public payload: string) {}
}

export class SearchMovies implements Action {
    readonly type = SEARCH_MOVIES;
    constructor(public payload: string) {}
}

export class LoadMovies implements Action {
    readonly type = LOAD_MOVIES;
}

export class GetMovieGenre implements Action {
    readonly type = GET_MOVIE_GENRE;
    constructor(public payload: string) {}
}

export class GetAllGenres implements Action {
    readonly type = GET_ALL_GENRES;
}

export class SetMovieList implements Action {
    readonly type = SET_MOVIE_LIST;
    constructor(public payload: Movie[]) {}
}

export class SetPage implements Action {
    readonly type = SET_PAGE;
    constructor(public payload: number) {}
}

export class SelectMovie implements Action {
    readonly type = SELECT_MOVIE;
    constructor(public payload: Movie) {}
}

export class SelectGenre implements Action {
    readonly type = SELECT_GENRE;
    constructor(public payload: string) {}
}

export class LoadingSuccess implements Action {
    readonly type = LOADING_SUCCESS;
    constructor(public payload: Movie[]) {}
}

export class LoadingFails implements Action {
    readonly type = LOADING_FAILS;
    constructor(public payload: any) {}
}

export class SearchingSuccess implements Action {
    readonly type = SEARCHING_SUCCESS;
    constructor(public payload: Movie[]) {}
}

export class SearchingFails implements Action {
    readonly type = SEARCHING_FAILS;
    constructor(public payload: any) {}
}

export type Actions =
| GetMovie
| SearchMovies
| LoadMovies
| GetMovieGenre
| GetAllGenres
| SetMovieList
| SetPage
| SelectMovie
| SelectGenre
| LoadingSuccess
| LoadingFails
| SearchingSuccess
| SearchingFails;


