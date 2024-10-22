import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/entities/Movie';
import { DataService } from 'src/app/services/data/data.service';
import { ResetSortingService } from 'src/app/services/reset-sorting/reset-sorting.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  movies : Movie[] = [];
  isAddedToFavorites : boolean = false;
  cardView! : boolean;

  private subscription! : Subscription;
  private subscriptionOnReset! : Subscription;

  constructor(private dataService : DataService, private resetSortingService : ResetSortingService) { }

  ngOnInit() : void {
    this.subscription = this.dataService.movies$.subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    });
  
    this.subscriptionOnReset = this.resetSortingService.resetSorting$.subscribe(()=> this.chooseSortingOnReload());

    if(localStorage.getItem('card-view') != null) {
      const value = localStorage.getItem('card-view');

      if(value == 'true') {
        this.showCards();
      } else if(value == 'false') {
        this.showList();
      }
    }

    this.chooseSortingOnReload();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionOnReset.unsubscribe();
  }

  sortByYear() {
    //this.movies.sort((a, b) => a.year - b.year);
    localStorage.setItem('filter', 'by-year');
  }

  sortByYearDesc() {
    //this.movies.sort((a, b) => b.year - a.year);
    localStorage.setItem('filter', 'by-year-desc');
  }

  sortByTitle() {
    this.movies.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
    
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
    localStorage.setItem('filter', 'by-title');
  }

  sortByTitleDesc() {
    this.movies.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
    
      if (titleA > titleB) return -1;
      if (titleA < titleB) return 1;

      return 0;
    });
    localStorage.setItem('filter', 'by-title-desc');
  }

  sortByDBAdding() {
    // this.movies.sort((a, b) => {
    //   const dateA = new Date(a.dateOfAdding).getTime();
    //   const dateB = new Date(b.dateOfAdding).getTime();
  
    //   return dateA - dateB;
    // });
    // localStorage.setItem('filter', 'by-db-adding');
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

  showCards() {
    this.cardView = true;
    localStorage.setItem('card-view', 'true');
  }

  showList() {
    this.cardView = false;
    localStorage.setItem('card-view', 'false');
  }
}
