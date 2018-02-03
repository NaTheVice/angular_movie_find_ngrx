import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer} from './core/movies.reducer';
import { MoviesEffects } from './core/movies-effects';
import { MoviesService } from './core/movie-service';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MoviesComponent
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
        path: '',
        component: HomeComponent
      },
      {
        path: 'movies',
        component: MoviesComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
