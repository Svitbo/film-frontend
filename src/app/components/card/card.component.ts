import { Component, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Movie } from 'src/app/entities/Movie';
import { MovieCreate } from 'src/app/entities/MovieCreate';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  // @Input() movieId! : number;
  // @Input() movieTitle! : string;
  // @Input() movieGenre! : string;
  // @Input() movieProductionYear! : number;
  // @Input() movieProductionCountry! : string;
  // @Input() movieProducer! : string;
  // @Input() movieDurationMinutes! : number;
  // @Input() movieRevenue! : number;
  // @Input() movieCreatedAt! : Date;
  // @Input() movieDescription! : string;

  // @Input() moviePosterPath! : string;
  //@Input() isAddedToFavorites : boolean = false;

  @Input() movie! : Movie;
  modalRef? : BsModalRef;
  updateForm : FormGroup;

  genres : string[] = ["Action", "Drama", "Comedy", "Horror", "Science fiction"];
  countries : string[] = ["USA", "UK", "Canada", "France"];
  producers : string[] = ["Legendary Pictures", "Warner Bros.", "Universal", "Pixar", "Disney", "Frank Darabont"];


  constructor(private dataService : DataService, private modalService : BsModalService, private formBuilder : FormBuilder, private userService : UserService) {
    this.updateForm = formBuilder.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      production_year: ['', Validators.required],
      production_country: ['', Validators.required],
      producer: ['', Validators.required],
      duration_minutes: ['', Validators.required],
      revenue: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    // this.movie = {
    //   id: this.movieId,
    //   title: this.movieTitle,
    //   genre: this.movieGenre,
    //   production_year: this.movieProductionYear,
    //   production_country: this.movieProductionCountry,
    //   producer: this.movieProducer,
    //   duration_minutes: this.movieDurationMinutes,
    //   revenue: this.movieRevenue,
    //   created_at: this.movieCreatedAt,
    //   description: this.movieDescription,
    //   // posterPath: this.moviePosterPath
    // };
  }

  editPermission() {
    let role = this.userService.getUserRole();

    if(role == 'admin') {
      return true;
    }
    return false;
  }

  userPermission() {
    let role = this.userService.getUserRole();

    if(role == 'user' || role == 'admin') {
      return true;
    }
    return false;
  }

  fillFormForEditing(movie : Movie) {
    // if (movie) {
    //   this.updateForm.patchValue({
    //     id: this.movieId,
    //     title: this.movieTitle,
    //     genre: this.movieGenre,
    //     production_year: this.movieProductionYear,
    //     production_country: this.movieProductionCountry,
    //     producer: this.movieProducer,
    //     duration_minutes: this.movieDurationMinutes,
    //     revenue: this.movieRevenue,
    //     created_at: this.movieCreatedAt,
    //     description: this.movieDescription,
    //   });
    // }
    if (movie) {
      this.updateForm.patchValue({
        id: this.movie.id,
        title: this.movie.title,
        genre: this.movie.genre,
        production_year: this.movie.production_year,
        production_country: this.movie.production_country,
        producer: this.movie.producer,
        duration_minutes: this.movie.duration_minutes,
        revenue: this.movie.revenue,
        created_at: this.movie.created_at,
        description: this.movie.description,
      });
    }
  }

  openModal(template : TemplateRef<any> | undefined) {
    this.fillFormForEditing(this.movie);
    console.log(this.movie);
    this.modalRef = this.modalService.show(template!);
  }

  deleteMovie() : void {
    this.dataService.deleteMovie(this.movie.id);
  }


  toggleFavorites() {
    //this.isAddedToFavorites = !this.isAddedToFavorites;
    //this.dataService.addedToFavorites(this.cardId, this.isAddedToFavorites);
  }





  onSubmit() {    
    if(this.updateForm.valid) {
      // const fileName : string = this.updateForm.get('file')!.value.split('\\').pop();
      // const fullPath : string = `assets/img/${fileName}`;
    
      const newMovie: MovieCreate = {
        title: this.updateForm.get('title')?.value,
        genre: this.updateForm.get('genre')?.value,
        production_year: this.updateForm.get('production_year')?.value,
        production_country: this.updateForm.get('production_country')?.value,
        producer: this.updateForm.get('producer')?.value,
        duration_minutes: this.updateForm.get('duration_minutes')?.value,
        revenue: this.updateForm.get('revenue')?.value,
        description: this.updateForm.get('description')?.value,
      };
      console.log(newMovie);
      this.dataService.updateMovie(this.movie.id, newMovie);
      
      // this.updateForm.reset();
      // this.modalRef!.hide();
    }
  }


}
