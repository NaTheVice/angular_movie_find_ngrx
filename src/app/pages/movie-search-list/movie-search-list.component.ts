import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MoviesService } from '../../core/movie-service';
import { Movie } from '../../core//movie.model';

import * as moviesReducers from '../../core/movies.reducer';
import * as moviesActions from '../../core/movies-actions';

@Component({
  selector: 'app-movie-search-list',
  templateUrl: './movie-search-list.component.html',
  styleUrls: ['./movie-search-list.component.scss']
})
export class MovieSearchListComponent implements OnInit {

  public movies$: Observable<Movie[]>;
  public fetchMoreMovies: () => void;
  public postersizes = ["w92","w154","w185","w342","w500","w780","original"];
  private moviesSubscription: Subscription;

  constructor(private store: Store<moviesReducers.State>) { 
    //this.movies$ = store.select(moviesReducers.getMoviesListState);
    this.movies$ = store.select(moviesReducers.getSearchMoviesListState);
  
  }

  get postersize(): string { return this.postersizes[Math.floor(Math.random()*this.postersizes.length)] }

  public ngOnInit() {
    
  }


  public selectMovie(movie: Movie): void {
    this.store.dispatch(new moviesActions.SelectMovie(movie));
    
  }
}

