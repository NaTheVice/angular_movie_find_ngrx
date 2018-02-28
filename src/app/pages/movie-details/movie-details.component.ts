import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as moviesReducers from '../../store/movies.reducer';
import { Movie } from '../../models/movie.model';
import { POSTER_URL} from '../../models/api';
import * as moviesActions from '../../store/movies-actions';
import {YoutubeService} from '../../services/youtube-service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  public movie: Movie;
  public movieSelected = false;
  private movieSubscription: Subscription;
  private posterUrl: string;
  private movie_credits: string;
  public video;
  public video_url;
  public video_embeded = '';

  constructor(private store: Store<moviesReducers.State>,
              private router: Router,
              private tubeService: YoutubeService) {
    this.posterUrl = POSTER_URL;
  }

  public ngOnInit() {
    this.movieSubscription = this.store.select(moviesReducers.getSelectedMovie).subscribe((movie: Movie) => {
      if (!movie) {
        this.movie = null;
      } else {
        this.movie = movie;
        this.movieSelected = true;
        this.searchVideos(movie.title);
      }
    });
  }

  public AfterViewInit() {
    this.getVideoLink();
  }

  public ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }

  public unSelectMovie(): void {
    this.store.dispatch(new moviesActions.SelectMovie(null));
    this.movieSelected = false;
    this.video_url = '';
  }

  public searchVideos(query) {
    query = query + 'trailer';
    if (query !== '') {
        this.tubeService.searchYouTube(query);
    }
  }
  getVideoLink() {
    this.video = this.tubeService.videos[0];
    this.video_url = 'https://youtu.be/' + this.video.id.videoId;
    this.video_embeded = 'https://www.youtube.com/embed/' + this.video.id.videoId + '/';
  }
}
