import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Імпорт FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AuthComponent } from './components/auth/auth.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { RevenueConverterPipe } from './pipe/revenue-converter';
import { ListItemComponent } from './components/list-item/list-item.component';
import { FilmComponent } from './components/film/film.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogComponent,
    FavoritesComponent,
    AuthComponent,
    MovieFormComponent,
    CardComponent,
    RevenueConverterPipe,
    ListItemComponent,
    FilmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
