import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MoviesService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';
import { Serie } from '../../models/serie.model';

import * as moviesReducers from '../../store/movies.reducer';
import * as moviesActions from '../../store/movies-actions';
import { genres } from '../../models/all-movie-genres.model';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss']
})
export class SerieComponent implements OnInit {
  public movies$: Observable<Serie[]>;
  private pagesSubscription: Subscription;
  public p = 1;
  public totalPages;
  public loading;
  private movieSubscription: Subscription;
  public movieSelected;
  public sichtbar = [];
  public language_id;
  public overview;

  constructor(
    private store: Store<moviesReducers.State>,
    public movieService: MoviesService
  ) {
    this.movies$ = store.select(moviesReducers.getSerieListState);
    this.loadSeriePage(1);
  }

  ngOnInit() {
    this.pagesSubscription = this.store
      .select(moviesReducers.getTotalPagesSerie)
      .subscribe(pages => {
        if (!pages) {
          this.totalPages = 0;
        } else {
          this.totalPages = pages;
        }
      });
    this.movieSubscription = this.store
      .select(moviesReducers.getSelectedMovie)
      .subscribe((movie: Movie) => {
        if (!movie) {
          this.movieSelected = false;
        } else {
          this.movieSelected = true;
        }
      });
  }

  public loadSeriePage(page: number) {
    this.store.dispatch(new moviesActions.LoadSerie(page));
  }

  public selectMovie(movie: Movie): void {
    this.store.dispatch(new moviesActions.SelectMovie(movie));
    this.movieSelected = true;
  }

  public getOverviewInGerman(id, i) {
    this.movieService.getSerieOverviewInGerman(id).subscribe(obj => {
      this.overview = obj.overview;
      this.language_id = id;
      this.sichtbar[i] = true;
    });
  }

  public getPage(page: number) {
    this.loading = true;
    this.p = page;
    this.loadSeriePage(page);
  }

  public getGenre(id) {
    const genre = genres.find(x => x.id === id);
    if (genre !== undefined) {
      return genre.name;
    }
    if (id !== undefined) {
      const genrename = 'Serie';
      return genrename;
    }
  }
}
