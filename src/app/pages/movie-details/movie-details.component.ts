import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as moviesReducers from '../../store/movies.reducer';
import { Movie } from '../../models/movie.model';
import { POSTER_URL} from '../../models/api';
import * as moviesActions from '../../store/movies-actions';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  public movie: Movie;
  public movieSelected = false;
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
        this.movieSelected = true;
      }
    });
  }

  public ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }

  public unSelectMovie(): void {
    this.store.dispatch(new moviesActions.SelectMovie(null));
    this.movieSelected = false;
  }
}
