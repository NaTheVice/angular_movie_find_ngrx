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

import { AppComponent } from './app.component';
import { NewsComponent } from './pages/news/news.component';
import { SearchComponent } from './pages/search/search.component';
import { FormsModule} from '@angular/forms';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SerieComponent } from './pages/serie/serie.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MovieSearchListComponent } from './pages/movie-search-list/movie-search-list.component';
import { SafeUrlPipe } from './pipe/safe_url_pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    SearchComponent,
    MovieListComponent,
    MovieDetailsComponent,
    SerieComponent,
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
    ApolloModule,
    HttpLinkModule,
    RouterModule.forRoot([
      {
        path: 'movies',
        component: NewsComponent
      },
      {
        path: 'Serie',
        component: SerieComponent
      },
      {
        path: 'profile',
        component: NewsComponent
      },
      {
        path: 'search',
        component: MovieSearchListComponent
      },
      {
        path: 'register',
        component: SerieComponent
      },
      {
        path: 'login',
        component: SerieComponent
      },
      {
        path: '**',
        redirectTo: 'movies',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [MoviesService, YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo,
    httpLink: HttpLink) {
    apollo.create({
      // By default, this client will send queries to the
      // `/graphql` endpoint on the same host
      link: httpLink.create({ uri: 'http://localhost:8080/graphql' }),
      cache: new InMemoryCache()
    });
  }

}
