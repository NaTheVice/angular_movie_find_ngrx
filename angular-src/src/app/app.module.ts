import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer} from './store/movies.reducer';
import { YoutubeService} from './services/youtube-service';
import { MoviesEffects } from './store/movies-effects';
import { MoviesService } from './services/movie-service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './core/app.component';
import { NewsComponent } from './pages/news/news.component';
import { SearchComponent } from './pages/search/search.component';
import { FormsModule} from '@angular/forms';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MovieSearchListComponent } from './pages/movie-search-list/movie-search-list.component';
import { SafeUrlPipe } from './pipe/safe_url_pipe';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    SearchComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MoviesComponent,
    NavbarComponent,
    MovieSearchListComponent,
    SafeUrlPipe
  ],
  imports: [
    StoreModule.forRoot({ movies: reducer }),
    EffectsModule.forRoot([MoviesEffects]),
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'movies',
        component: MoviesComponent
      },
      {
        path: 'profile',
        component: NewsComponent
      },
      {
        path: 'register',
        component: MoviesComponent
      },
      {
        path: 'login',
        component: MoviesComponent
      },
      {
        path: '**',
        redirectTo: 'news',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [MoviesService, YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
