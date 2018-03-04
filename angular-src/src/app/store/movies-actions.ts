import {Action} from '@ngrx/store';
import {Movie} from '../models/movie.model';
import {Serie} from '../models/serie.model';

export const GET_MOVIE = 'GET_MOVIE';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const SEARCH_SERIE = 'SEARCH_SERIE';
export const LOAD_MOVIES = 'LOAD_MOVIES';
export const LOAD_SERIE = 'LOAD_SERIE';
export const LOAD_MOVIE_CREDITS = 'LOAD_MOVIE_CREDITS';
export const SET_MOVIE_CREDITS = 'SET_MOVIE_CREDITS';
export const GET_MOVIE_GENRE = 'GET_MOVIE_GENRE';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const SET_MOVIE_LIST = 'SET_MOVIES_LIST';
export const SET_PAGE = 'PAGE';
export const SELECT_MOVIE = 'SELECT_MOVIE';
export const SELECT_GENRE = 'SELECT_GENRE';
export const LOADING_SUCCESS = 'LOADING_SUCCESS';
export const LOADING_FAILS = 'LOADING_FAILS';
export const LOADING_SUCCESS_SERIE = 'LOADING_SUCCESS_SERIE';
export const LOADING_FAILS_SERIE = 'LOADING_FAILS_SERIE';
export const SEARCHING_SUCCESS = 'SEARCHING_SUCCESS';
export const SEARCHING_FAILS = 'SEARCHING_FAILS';
export const READY_TO_SET_MOVIES = 'READY_TO_SET_MOVIES';
export const SET_TOTAL_PAGES_NEWS = 'SET_TOTAL_PAGES_NEWS';
export const SET_TOTAL_PAGES_SERIE = 'SET_TOTAL_PAGES_SERIE';
export const SET_TOTAL_PAGES_SEARCH = 'SET_TOTAL_PAGES_SEARCH';


export class GetMovie implements Action {
    readonly type = GET_MOVIE;
    constructor(public payload: string) {}
}

export class SetTotalPagesNews implements Action {
    readonly type = SET_TOTAL_PAGES_NEWS;
    constructor(public payload: number) {
    }
}

export class SetTotalPagesSerie implements Action {
    readonly type = SET_TOTAL_PAGES_SERIE;
    constructor(public payload: number) {
    }
}

export class SetTotalPagesSearch implements Action {
    readonly type = SET_TOTAL_PAGES_SEARCH;
    constructor(public payload: number) {
    }
}
export class SearchMovies implements Action {
    readonly type = SEARCH_MOVIES;
    constructor(public payload: string, public page: number) {}
}

export class SearchSerie implements Action {
    readonly type = SEARCH_SERIE;
    constructor(public payload: string) {}
}

export class LoadMovies implements Action {
    readonly type = LOAD_MOVIES;
    constructor(public payload: number) {
    }
}

export class LoadSerie implements Action {
    readonly type = LOAD_SERIE;
    constructor(public payload: number) {
    }
}

export class ReadyToSetMovies implements Action {
    readonly type = READY_TO_SET_MOVIES;
    constructor(public payload: boolean) {
    }
}

export class SetMovieCredits implements Action {
    readonly type = SET_MOVIE_CREDITS;
    constructor(public payload: Movie[]) {}
}

export class LoadMovieCredits implements Action {
    readonly type = LOAD_MOVIE_CREDITS;
    constructor(public payload: Movie) {}
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

export class LoadingSuccessSerie implements Action {
    readonly type = LOADING_SUCCESS_SERIE;
    constructor(public payload: Serie[]) {}
}

export class LoadingFails implements Action {
    readonly type = LOADING_FAILS;
    constructor(public payload: any) {}
}

export class LoadingFailsSerie implements Action {
    readonly type = LOADING_FAILS_SERIE;
    constructor(public payload: any) {}
}

export class SearchingSuccess implements Action {
    readonly type = SEARCHING_SUCCESS;
    constructor(public payload: Movie[]) {
    }
}

export class SearchingFails implements Action {
    readonly type = SEARCHING_FAILS;
    constructor(public payload: any) {}
}

export type Actions =
| GetMovie
| SearchMovies
| LoadMovies
| LoadSerie
| GetMovieGenre
| GetAllGenres
| SetMovieList
| SetPage
| SelectMovie
| SelectGenre
| LoadingSuccess
| LoadingSuccessSerie
| LoadingFails
| LoadingFailsSerie
| SearchingSuccess
| SearchingFails
| SetMovieCredits
| LoadMovieCredits
| SetTotalPagesNews
| SetTotalPagesSerie
| SetTotalPagesSearch
| ReadyToSetMovies;


