import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/entities/Movie';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent {
  movie : Movie | null = null;

  movieId! : number;
  movieTitle! : string;
  movieGenre! : string;
  movieProductionYear! : number;
  movieProductionCountry! : string;
  movieProducer! : string;
  movieDurationMinutes! : number;
  movieRevenue! : number;
  movieCreatedAt! : Date;
  movieDescription! : string;
  moviePosterPath! : string;

  constructor(private route: ActivatedRoute, private dataService :  DataService) {}

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('id')!;
    this.dataService.getMovieById(this.movieId).subscribe(
      (data) => {
        this.movie = data;
        console.log(this.movie);
      },
      (error) => {
        console.error('Error fetching items', error);
      }
    );
  }
}
