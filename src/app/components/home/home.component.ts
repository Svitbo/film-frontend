import { Component } from '@angular/core';
import { Movie } from 'src/app/entities/Movie';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  movies : Movie[] = [];
  filteredMovies : Movie[] = [];

  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.loadFilms('created_at', 'desc');
  }

  loadFilms(sortBy: string, sortOrder: string): void {
    this.dataService.getSortedFilms(sortBy, sortOrder).subscribe(
      (data) => {
        this.movies = data;
        this.filteredMovies = this.movies.slice(0, 5);
      },
      (error) => {
        console.error('Error fetching sorted films', error);
      }
    );
  }
}
