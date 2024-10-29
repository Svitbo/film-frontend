import { Component } from '@angular/core';
import { Movie } from 'src/app/entities/Movie';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  cardView : boolean = true;
  titleToSearchBy: string = '';
  movies : Movie[] = [];
  favoriteMovies : Movie[] = []; 
  filteredMovies : Movie[] = [];
  filteredFavMovies : Movie[] = [];

  constructor(private dataService : DataService, private userService : UserService) { }

  ngOnInit(): void {
    this.loadFilms('title', 'asc');

    this.dataService.movies$.subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = this.movies;
      this.checkAddedToFavorites();
    });
  
    if (this.userService.isLoggedIn()) {
      this.userService.getFavoriteFilms();
    }
    
    this.userService.favoriteMovies$.subscribe(movies => {
      this.favoriteMovies = movies;
      this.checkAddedToFavorites();
    });
  
    this.dataService.titleToSearchBy$.subscribe(title => {
      this.titleToSearchBy = title;
      this.filterMovies();
      this.checkAddedToFavorites();
    });
  
    if (localStorage.getItem('card-view') != null) {
      const value = localStorage.getItem('card-view');
      value === 'true' ? this.showCards() : this.showList();
    }
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

  showCards() {
    this.cardView = true;
    localStorage.setItem('card-view', 'true');
  }

  showList() {
    this.cardView = false;
    localStorage.setItem('card-view', 'false');
  }

  checkAddedToFavorites() {
    this.filteredFavMovies = this.filteredMovies.map(movie => ({
      ...movie,
      isAddedToFavorites: this.favoriteMovies.some(fav => fav.id === movie.id)
    }));
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
}
