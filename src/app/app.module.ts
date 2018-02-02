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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    StoreModule.forRoot({ movies: reducer }),
    EffectsModule.forRoot([MoviesEffects]),
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
        path: 'search',
        component: SearchComponent
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
