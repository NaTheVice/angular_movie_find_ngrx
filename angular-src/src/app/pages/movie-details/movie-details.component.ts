import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import * as moviesReducers from '../../store/movies.reducer';
import { Movie } from '../../models/movie.model';
import { POSTER_URL} from '../../models/api';
import * as moviesActions from '../../store/movies-actions';
import {YoutubeService} from '../../services/youtube-service';
import { MoviesService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  public movie: Movie;
  public movieSelected = false;
  private movieSubscription: Subscription;
  private posterUrl: string;
  private movie_credits: string;
  public video;
  public video_url;
  public video_embeded = '';
  public year = '';
  public bstoLink;
  public seasons$: Observable<Movie[]>;

  constructor(private store: Store<moviesReducers.State>,
              private router: Router,
              private tubeService: YoutubeService,
              private movieService: MoviesService) {
    this.posterUrl = POSTER_URL;
    this.seasons$ = store.select(moviesReducers.getSeasonsState);
  }

  public ngOnInit() {
    this.movieSubscription = this.store.select(moviesReducers.getSelectedMovie).subscribe((movie: Movie) => {
      if (!movie) {
        this.movie = null;
      } else {
        this.movie = movie;
        this.movieSelected = true;
        if (movie.name) {
          this.year = new Date().getFullYear().toString();
          const query = movie.name + ' ' + this.year + ' german';
          this.searchVideos(query);
          this.getBsLink(movie.name);
          this.getSeasons(movie.id);
        } else {
          this.year = this.movie.release_date.slice(0, 5);
          const query = movie.title + this.year + 'trailer german';
          this.searchVideos(query);
        }

      }
    });
  }

  public searchPersonMovie(id, page): void {
    this.unSelectMovie();
    this.router.navigate(['search']);
    this.movieService.getPersonMovies(id, 1);
  }

  public unSelectMovie(): void {
    this.store.dispatch(new moviesActions.SelectMovie(null));
    this.movieSelected = false;
    this.video_url = '';
  }

  public getSeasons(id): void {
    this.store.dispatch(new moviesActions.GetSeasons(id));
  }

  public searchVideos(query) {
    if (query !== '') {
        this.tubeService.searchYouTube(query);
    }
  }
  getVideoLink() {
    this.video = this.tubeService.videos[0];
    this.video_url = 'https://youtu.be/' + this.video.id.videoId;
    this.video_embeded = 'https://www.youtube.com/embed/' + this.video.id.videoId + '/';
  }
  getBsLink(serie: string) {
    const name = serie.replace(/ /g, '-');
    this.bstoLink = 'https://bs.to/serie/' + name;
  }
}
