import { Component } from '@angular/core';
import { Movie } from 'src/app/entities/Movie';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  titleToSearchBy: string = '';

  movies : Movie[] = [];
  favoriteMovies : Movie[] = []; 
  filteredMovies : Movie[] = [];

  filteredFavMovies : Movie[] = []
  cardView! : boolean;

  constructor(private dataService : DataService, private userService : UserService) { }

  ngOnInit() : void {
    this.dataService.movies$.subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = this.movies;
      this.checkAddedToFavorites();
    });
  
    this.userService.getFavoriteFilms();
  
    this.userService.favoriteMovies$.subscribe(movies => {
      this.favoriteMovies = movies;
      this.checkAddedToFavorites();
    });
  
    this.dataService.titleToSearchBy$.subscribe(title => {
      this.titleToSearchBy = title;
      this.filterMovies();
      this.checkAddedToFavorites();
    });

    if(localStorage.getItem('card-view') != null) {
      const value = localStorage.getItem('card-view');

      if(value == 'true') {
        this.showCards();
      } else if(value == 'false') {
        this.showList();
      }
    }
  }

  checkAddedToFavorites() {
    this.filteredFavMovies = this.filteredMovies.map(movie => ({
      ...movie,
      isAddedToFavorites: this.favoriteMovies.some(fav => fav.id === movie.id)
    }));
  }
  
  filterMovies() {
    if (!this.titleToSearchBy) {
      this.filteredMovies = this.movies;
    } else {
      const lowerCaseTerm = this.titleToSearchBy.toLowerCase();
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }

  loadFilms(sortBy: string, sortOrder: string): void {
    this.dataService.getSortedFilms(sortBy, sortOrder).subscribe(
      (data) => {
        this.movies = data;
        this.filterMovies()        
        this.checkAddedToFavorites();
      },
      (error) => {
        console.error('Error fetching sorted films', error);
      }
    );
  }

  sortByTitle(): void {
    this.loadFilms('title', 'asc');
  }

  sortByTitleDesc(): void {
    this.loadFilms('title', 'desc');
  }

  sortByYear(): void {
    this.loadFilms('production_year', 'asc');
  }

  sortByYearDesc(): void {
    this.loadFilms('production_year', 'desc');
  }

  sortByRecentlyAdded(): void {
    this.loadFilms('created_at', 'asc');
  }

  sortByLeastRecentlyAdded(): void {
    this.loadFilms('created_at', 'desc');
  }

  showCards() {
    this.cardView = true;
    localStorage.setItem('card-view', 'true');
  }

  showList() {
    this.cardView = false;
    localStorage.setItem('card-view', 'false');
  }
}
