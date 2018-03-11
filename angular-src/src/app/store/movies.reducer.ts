import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Movie } from '../models/movie.model';
import { Serie } from '../models/serie.model';
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
  totalPages: number;
  totalPagesSerie: number;
  totalPagesSearch: number;
  serie: Serie[];
  person_id: number;
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
  readyToSetMovies: false,
  totalPages: 0,
  totalPagesSerie: 0,
  totalPagesSearch: 0,
  serie: [],
  person_id: 0
};

export function reducer(
  state = initialState,
  action: moviesActions.Actions): State {
  switch (action.type) {
    case moviesActions.LOAD_MOVIES: {
      return {
        ...state,
        loading: true
      };
    }
    case moviesActions.LOAD_SERIE: {
      return {
        ...state,
        loading: true
      };
    }
    case moviesActions.SET_PERSON_ID: {
      return {
        ...state,
        person_id: action.payload
      };
    }
    case moviesActions.READY_TO_SET_MOVIES: {
      return {
        ...state,
        readyToSetMovies: action.payload
      };
    }

    case moviesActions.LOAD_MOVIE_CREDITS: {
      return {
        ...state,
        creditsLoaded: true
      };
    }

    case moviesActions.SET_TOTAL_PAGES_NEWS: {
      return {
        ...state,
        totalPages: action.payload
      };
    }
    case moviesActions.SET_TOTAL_PAGES_SERIE: {
      return {
        ...state,
        totalPagesSerie: action.payload
      };
    }
    case moviesActions.SET_TOTAL_PAGES_SEARCH: {
      return {
        ...state,
        totalPagesSearch: action.payload
      };
    }
    case moviesActions.SET_MOVIE_CREDITS: {
      return {
        ...state,
        searchMovies: [...action.payload]
      };
    }

    case moviesActions.LOADING_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        movies: [...action.payload]
      };
    }
    case moviesActions.LOADING_SUCCESS_SERIE: {
      return {
        ...state,
        loaded: true,
        loading: false,
        serie: [...action.payload]
      };
    }

    case moviesActions.LOADING_FAILS: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case moviesActions.LOADING_FAILS_SERIE: {
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

    case moviesActions.CLEAR_QUERY: {
      return {
        ...state,
        query: ''
      };
    }

    case moviesActions.SEARCHING_SUCCESS: {
      return {
        ...state,
        searched: true,
        searching: false,
        searchMovies: [...action.payload]
      };
    }

    case moviesActions.SEARCHING_FAILS: {
      return {
        ...state,
        searched: false,
        searching: false
      };
    }

    case moviesActions.SELECT_MOVIE: {
      const newMoviesArray = state.movies.map((movie: Movie) => {
        return {
          ...movie,
          isSelected: false
        };
      });
      if (action.payload) {
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
      } else {
        return {
          ...state,
          movies: newMoviesArray,
          selectedMovie: null
        };
      }
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
export const getSerieListState = createSelector(
  getMoviesState,
  (state: State) => state.serie
);
export const getSearchMoviesListState = createSelector(
  getMoviesState,
  (state: State) => state.searchMovies
);
export const getSelectedMovie = createSelector(
  getMoviesState,
  (state: State) => state.selectedMovie
);

export const getTotalPages = createSelector(
  getMoviesState,
  (state: State) => state.totalPages
);
export const getTotalPagesSerie = createSelector(
  getMoviesState,
  (state: State) => state.totalPagesSerie
);
export const getTotalPagesSearch = createSelector(
  getMoviesState,
  (state: State) => state.totalPagesSearch
);
export const getSearchQuery = createSelector(
  getMoviesState,
  (state: State) => state.query
);
export const getPersonId = createSelector(
  getMoviesState,
  (state: State) => state.person_id
);
