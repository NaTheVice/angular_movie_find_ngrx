export const API_KEY = 'a650bc23f071e894a70bacf516a840a3';
export const MOVIE_DISCOVER_DB_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
export const MOVIE_SEARCH_DB_URL = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`;
export const POSTER_URL = 'https://image.tmdb.org/t/p/w500';
export const NEWEST_MOVIES = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}
&sort_by=popularity.desc&primary_release_date.gte=`;
export const NEWEST_SERIE = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}
&sort_by=popularity.desc&primary_release_date.gte=`;

export const MOVIE_DISCOVER_DB_URL_GER = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=de`;
export const MOVIE_SEARCH_DB_URL_GER = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=de`;
export const NEWEST_MOVIES_GER = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}
&language=de?sort_by=popularity.desc&primary_release_date.gte=`;

/*
                                 Min Res      Max Res
poster   = Poster ............  500 x 750   2000 x 3000
backdrop = Fanart ............ 1280 x 720   3840 x 2160
still    = TV Show Episode ... 1280 x 720   3840 x 2160
profile  = Actors Actresses ..  300 x 450   2000 x 3000
logo     = TMDb Logo

## Image Sizes

|  poster  | backdrop |  still   | profile  |   logo   |
| :------: | :------: | :------: | :------: | :------: |
| -------- | -------- | -------- |    w45   |    w45   |
|    w92   | -------- |    w92   | -------- |    w92   |
|   w154   | -------- | -------- | -------- |   w154   |
|   w185   | -------- |   w185   |   w185   |   w185   |
| -------- |   w300   |   w300   | -------- |   w300   |
|   w342   | -------- | -------- | -------- | -------- |
|   w500   | -------- | -------- | -------- |   w500   |
| -------- | -------- | -------- |   h632   | -------- |
|   w780   |   w780   | -------- | -------- | -------- |
| -------- |  w1280   | -------- | -------- | -------- |
| original | original | original | original | original |

*/
