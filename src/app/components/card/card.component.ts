import { Component, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Movie } from 'src/app/entities/Movie';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() movieId! : number;
  @Input() movieTitle! : string;
  @Input() movieGenre! : string;
  @Input() movieProductionYear! : number;
  @Input() movieProductionCountry! : string;
  @Input() movieProducer! : string;
  @Input() movieDurationMinutes! : number;
  @Input() movieRevenue! : number;
  @Input() movieCreatedAt! : Date;
  @Input() movieDescription! : string;

  @Input() moviePosterPath! : string;
  //@Input() isAddedToFavorites : boolean = false;

  movie! : Movie;
  modalRef? : BsModalRef;
  updateForm : FormGroup;

  constructor(private dataService : DataService, private modalService : BsModalService, private formBuilder : FormBuilder) {
    this.updateForm = formBuilder.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      revenue: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.movie = {
      id: this.movieId,
      title: this.movieTitle,
      genre: this.movieGenre,
      production_year: this.movieProductionYear,
      production_country: this.movieProductionCountry,
      producer: this.movieProducer,
      duration_minutes: this.movieDurationMinutes,
      revenue: this.movieRevenue,
      created_at: this.movieCreatedAt,
      description: this.movieDescription,
      // posterPath: this.moviePosterPath
    };
    console.log('card');
    console.log(this.movie);
  }

  toggleFavorites() {
    //this.isAddedToFavorites = !this.isAddedToFavorites;
    //this.dataService.addedToFavorites(this.cardId, this.isAddedToFavorites);
  }

  deleteMovie() : void {
    //this.dataService.deleteMovie(this.cardId);
  }

  openModal(template : TemplateRef<any> | undefined) {
    this.fillFormForEditing(this.movie);
    this.modalRef = this.modalService.show(template!);
  }

  onSubmit() {    
    if(this.updateForm.valid) {
      const fileName : string = this.updateForm.get('file')!.value.split('\\').pop();
      const fullPath : string = `assets/img/${fileName}`;
    
      const newMovie : Movie = this.createMovie(this.updateForm.get('title')!.value, this.updateForm.get('year')!.value, this.updateForm.get('revenue')!.value, fullPath);
      
      //this.dataService.updateMovie(newMovie);
      
      this.updateForm.reset();
      this.modalRef!.hide();
    }
  }

  createMovie(
    title : string,
    year : number,
    revenue : number,
    posterPath : string) : any {
        //   const newMovie : Movie = {
        //     id: this.movie.id,
        //     title: title,
        //     //year: year,
        //     revenue: revenue,
        //     //posterPath: posterPath,
        //     //dateOfAdding: new Date(),
        //     //isAdded: this.movie.isAdded,
        //     //isAddedToFavorites: this.movie.isAddedToFavorites
        // };

        // return newMovie;
  }

  fillFormForEditing(movie : Movie) {
      // if (movie) {
      //   this.updateForm.patchValue({
      //     title: movie.title,
      //     year: movie.year,
      //     revenue: movie.revenue
      //   });
      // }
  }

  editPermission() {
      let role = localStorage.getItem('role');
  
      if(role == 'Moderator' || role == 'Admin') {
        return true;
      } 
      return false;
  }

  noPermission() {
      let role = localStorage.getItem('role');
  
      if(role == null || role == 'Guest') {
        return false;
      } 
      return true;
  }
}
