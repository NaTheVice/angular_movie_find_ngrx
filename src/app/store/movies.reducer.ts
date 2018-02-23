import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Movie } from '../models/movie.model';

import * as moviesActions from './movies-actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  movies: Movie[];
  query: string;
  searched: boolean;
  searching: boolean;
  searchMovies: Movie[];
  selectedMovie: Movie;
  creditsLoaded: boolean;
  readyToSetMovies: boolean;
}

const initialState: State = {
  loaded: false,
  loading: false,
  movies: [],
  query: '',
  searched: false,
  searching: false,
  searchMovies: [],
  selectedMovie: null,
  creditsLoaded: false,
  readyToSetMovies: false
};

export function reducer(
  state = initialState,
  action: moviesActions.Actions
): State {
  switch (action.type) {
    case moviesActions.LOAD_MOVIES: {
      return {
        ...state,
        loading: true
      };
    }

    case moviesActions.READY_TO_SET_MOVIES: {
      return {
        ...state,
        readyToSetMovies:  action.payload
      };
    }

    case moviesActions.LOAD_MOVIE_CREDITS: {
      return {
        ...state,
        creditsLoaded: true
      };
    }

    case moviesActions.SET_MOVIE_CREDITS: {
      return {
        ...state,
        searchMovies: [ ...action.payload ]
      };
    }

    case moviesActions.LOADING_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        movies: [ ...state.movies, ...action.payload ]
      };
    }

    case moviesActions.LOADING_FAILS: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    case moviesActions.SEARCH_MOVIES: {
      return {
        ...state,
        query: action.payload,
        searching: true
      };
    }

    case moviesActions.SEARCHING_SUCCESS: {
      return {
        ...state,
        searched: true,
        searching: false,
        searchMovies: [ ...action.payload ]
      };
    }

    case moviesActions.SEARCHING_FAILS: {
      return {
        ...state,
        searched: false,
        searching: false,
      };
    }

    case moviesActions.SELECT_MOVIE: {
      const newMoviesArray = state.movies.map((movie: Movie) => {
        return {
          ...movie,
          isSelected: false
        };
      });
      const selectedMovie = newMoviesArray.find((movie: Movie) => {
        return movie.id === action.payload.id;
      });
      if (selectedMovie) {
        selectedMovie.isSelected = true;
      }

      return {
        ...state,
        movies: newMoviesArray,
        selectedMovie: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getMoviesState = createFeatureSelector<State>('movies');
export const getMoviesListState = createSelector(
  getMoviesState,
  (state: State) => state.movies
);
export const getSearchMoviesListState = createSelector(
  getMoviesState,
  (state: State) => state.searchMovies
);
export const getSelectedMovie = createSelector(
  getMoviesState,
  (state: State) => state.selectedMovie
);
