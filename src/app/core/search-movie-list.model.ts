import {genres} from './all-movie-genres.model';
import {Movie} from './movie.model';

export class SearchMovieList {
    constructor(
      movies: Array<any>,
      // tslint:disable-next-line:no-shadowed-variable
      genres: Array<any>,
      selectedGenre: string,
      selectedMovie: Movie

    ) { }
  }
  export const initialTag: SearchMovieList = {
    movies: [],
    genres: [],
    selectedGenre: '',
    selectedMovie: null
  };
