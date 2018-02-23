import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer} from './store/movies.reducer';
import { MoviesEffects } from './store/movies-effects';
import { MoviesService } from './services/movie-service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './core/app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { FormsModule} from '@angular/forms';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MovieSearchListComponent } from './pages/movie-search-list/movie-search-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MoviesComponent,
    NavbarComponent,
    MovieSearchListComponent
  ],
  imports: [
    StoreModule.forRoot({ movies: reducer }),
    EffectsModule.forRoot([MoviesEffects]),
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'movies',
        component: MoviesComponent
      },
      {
        path: 'profile',
        component: HomeComponent
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
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
