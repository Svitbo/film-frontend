import { Component } from '@angular/core';
import { Movie } from 'src/app/entities/Movie';
import { DataService } from 'src/app/services/data/data.service';
import { ResetSortingService } from 'src/app/services/reset-sorting/reset-sorting.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  cardView : boolean = true;

  genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance'];
  selectedGenre: string = 'all';
  yearFrom: number | null = null;
  yearTo: number | null = null;
  yearError: string | null = null; 
  currentYear = new Date().getFullYear();

  titleToSearchBy: string = '';

  movies : Movie[] = [];
  favoriteMovies : Movie[] = []; 
  filteredMovies : Movie[] = [];

  filteredFavMovies : Movie[] = []

  constructor(private dataService : DataService, private resetSortingService : ResetSortingService, private userService : UserService) { }

  ngOnInit(): void {
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
  

    // console.log('All movies', this.movies);
    // console.log('Filtered movies', this.filteredMovies);
    // console.log('Favorite movies', this.favoriteMovies);
  
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
    
    // console.log(this.filteredFavMovies);
  }
  








  sortByYear() {
    //this.movies.sort((a, b) => a.year - b.year);
    //localStorage.setItem('filter', 'by-year');
  }

  sortByYearDesc() {
    //this.movies.sort((a, b) => b.year - a.year);
    //localStorage.setItem('filter', 'by-year-desc');
  }

  sortByTitle() {
    // this.movies.sort((a, b) => {
    //   const titleA = a.title.toLowerCase();
    //   const titleB = b.title.toLowerCase();
    
    //   if (titleA < titleB) return -1;
    //   if (titleA > titleB) return 1;
    //   return 0;
    // });
    // localStorage.setItem('filter', 'by-title');
  }

  sortByTitleDesc() {
    // this.movies.sort((a, b) => {
    //   const titleA = a.title.toLowerCase();
    //   const titleB = b.title.toLowerCase();
    
    //   if (titleA > titleB) return -1;
    //   if (titleA < titleB) return 1;

    //   return 0;
    // });
    // localStorage.setItem('filter', 'by-title-desc');
  }

  sortByDBAdding() {
    //this.movies.sort((a, b) => {
      //const dateA = new Date(a.dateOfAdding).getTime();
      //const dateB = new Date(b.dateOfAdding).getTime();
  
      //return dateA - dateB;
    //});
    //localStorage.setItem('filter', 'by-db-adding');
  }

  sortByDBAddingDesc() {
    // this.movies.sort((a, b) => {
    //   const dateA = new Date(a.dateOfAdding).getTime();
    //   const dateB = new Date(b.dateOfAdding).getTime();
  
    //   return dateB - dateA;
    // });
    // localStorage.setItem('filter', 'by-db-adding-desc');
  }

  resetSorting() {
    this.movies = JSON.parse(localStorage.getItem('movies')!);
    localStorage.removeItem('filter');
  }

  chooseSortingOnReload() {
    const filter = localStorage.getItem('filter');
  
    if(filter == 'by-year') {
      this.sortByYear();
    } else if(filter == 'by-year-desc') {
      this.sortByYearDesc();
    } else if(filter == 'by-title') {
      this.sortByTitle();
    } else if(filter == 'by-title-desc') {
      this.sortByTitleDesc();
    } else if(filter == 'by-db-adding') {
      this.sortByDBAdding();
    } else if(filter == 'by-db-adding-desc') {
      this.sortByDBAddingDesc();
    }
    else {
      this.resetSorting();
    }
  }

  // findMovie(title : string) {
  //   this.movies.filter(movie => movie.title.toLowerCase() == title.toLowerCase());
  // }
  
  
  applyFilter() {
    this.yearError = null;

    this.yearError = '';

    if (!this.yearFrom && !this.yearTo) {
      console.log('Filtering movies by genre only:', this.selectedGenre);
      this.yearError = '';
    }

    if (this.yearFrom && !this.yearTo ) {
      if (this.yearFrom <= this.currentYear) {
        this.yearError = `Enter valid year, it's only ${this.currentYear}!`;
        return;
      }
      this.yearError = '';
      console.log('Filtering movies from:', this.yearFrom, 'to:', this.currentYear);
    }

    if (!this.yearFrom && this.yearTo) {
      if (this.yearTo <= this.currentYear) {
        this.yearError = `Enter valid year, it's only ${this.currentYear}!`;
        return;
      }
      this.yearError = '';
      console.log('Filtering movies from start to:', this.yearTo);
    }

    if (this.yearFrom && this.yearTo) {
      if (this.yearFrom < 1900 || this.yearFrom > 2024 || this.yearTo < 1900 || this.yearTo > 2024) {
        this.yearError = 'Please enter valid years.';
        return;
      }

      if (this.yearFrom > this.yearTo) {
        this.yearError = 'Start year is bigger than end year.';
        return;
      }
      
    console.log('Filtering movies from:', this.yearFrom, 'to:', this.yearTo);
    
    console.log('Year Range:', this.yearFrom, '-', this.yearTo);

    if (this.selectedGenre === 'all') {
      console.log('No genre filter');
    } else {
      console.log('Selected Genre:', this.selectedGenre);
    }
    this.yearError = '';
  }
  
  }

}
