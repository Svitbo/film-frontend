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
  @Input() movie! : any;
  @Input() toEdit! : boolean;

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

  editPermission() {
    let role = this.userService.getUserRole();

    if(role == 'admin' && this.toEdit) {
      return true;
    }
    return false;
  }

  favoritesPermission() {
    let role = this.userService.getUserRole();

    if(role == 'user' && this.toEdit) {
      return true;
    }
    return false;
  }

  fillFormForEditing(movie : Movie) {
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
    this.dataService.deleteMovie(this.movie.id).subscribe(
      (response) => {
        console.log('Movie deleted:', response);
      },
      (error) => {
        console.error('Error deleting movie:', error);
      }
    );
  }

  toggleFavorites() {
    console.log(this.movie.isAddedToFavorites);
    if (this.movie.isAddedToFavorites) {
      this.userService.deleteFavoriteFilm(this.userService.getUserId(), this.movie.id).subscribe(() => {
        this.userService.getFavoriteFilms();
      });
    } else {
      this.userService.addFavoriteFilm(this.userService.getUserId(), this.movie.id).subscribe(() => {
        this.userService.getFavoriteFilms();
      });
    }
  }
  
  onSubmit() {    
    if(this.updateForm.valid) {    
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
      
      this.dataService.updateMovie(this.movie.id, newMovie).subscribe(
        (response) => {
          console.log('Movie updated:', response);
        },
        (error) => {
          console.error('Error updating movie:', error);
        }
      );
      
      this.updateForm.reset();
      this.modalRef!.hide();
    }
  }
}
