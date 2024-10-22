import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { userTableGuard } from './guards/user-table/user-table.guard';
import { favoritesGuard } from './guards/favorites/favorites.guard';
import { FilmComponent } from './components/film/film.component';

const routes: Routes = [
  { path: "catalog", component: CatalogComponent },
  { path: "favorites", component: FavoritesComponent, canActivate: [favoritesGuard] },
  { path: "film/:id", component: FilmComponent },
  { path: "", redirectTo: "/catalog", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
