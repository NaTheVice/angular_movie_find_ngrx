import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';

import * as moviesReducers from '../../core/movies.reducer';
import { Movie } from '../../core/movie.model';
import { POSTER_URL} from '../../core/api-urls';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  public movie: Movie;

  private movieSubscription: Subscription;
  private posterUrl: string;
  private movie_credits: string;

  constructor(private store: Store<moviesReducers.State>, private router: Router) {
    this.posterUrl = POSTER_URL;
  }

  public ngOnInit() {
    this.movieSubscription = this.store.select(moviesReducers.getSelectedMovie).subscribe((movie: Movie) => {
      if (!movie) {
        this.movie = null;
      } else {
        this.movie = movie;
      }
    });
  }

  public ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }

}
