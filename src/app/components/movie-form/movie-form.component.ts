import { Component, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Movie } from 'src/app/entities/Movie';
import { MovieCreate } from 'src/app/entities/MovieCreate';
import { DataService } from 'src/app/services/data/data.service';
import { fileValidator } from 'src/app/validators/FileValidator';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent {
  addForm : FormGroup;
  modalRef? : BsModalRef;

  genres : string[] = ["Action", "Drama", "Comedy", "Horror", "Science fiction"];
  countries : string[] = ["USA", "UK", "Canada", "France"];
  producers : string[] = ["Legendary Pictures", "Warner Bros.", "Universal", "Pixar", "Disney", "Frank Darabont"];

  selectedFile: File | null = null;



  constructor(private fb: FormBuilder, private dataService: DataService, private modalService : BsModalService) {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      production_year: ['', Validators.required],
      production_country: ['', Validators.required],
      producer: ['', Validators.required],
      duration_minutes: ['', Validators.required],
      revenue: ['', Validators.required],
      description: ['', Validators.required],
      cover_image: ['', fileValidator()]
    });
  }

  ngOnInit(): void { }


  onSubmit() {

    // console.log('Значення форми:', this.addForm.value);
    // console.log('Стан форми:', this.addForm);
    if (this.addForm.valid) {
      console.log('valid');
      const newMovie: MovieCreate = {
        title: this.addForm.get('title')?.value,
        genre: this.addForm.get('genre')?.value,
        production_year: this.addForm.get('production_year')?.value,
        production_country: this.addForm.get('production_country')?.value,
        producer: this.addForm.get('producer')?.value,
        duration_minutes: this.addForm.get('duration_minutes')?.value,
        revenue: this.addForm.get('revenue')?.value,
        description: this.addForm.get('description')?.value
      };

      const formData = new FormData();
      formData.append("cover_image", this.selectedCoverImage!, this.selectedCoverImage?.name);
      console.log(formData.get('cover_image'));

      this.dataService.addMovie(newMovie, formData).subscribe(
        (response) => {
          console.log('Movie added:', response);
        },
        (error) => {
          console.error('Error adding movie:', error);
        }
      );
      this.modalRef?.hide();

  } else {
      console.log('invalid');
      this.addForm.markAllAsTouched();
  }
  }


  openModal(template : TemplateRef<any> | undefined) {
    this.modalRef = this.modalService.show(template!);
  }

  selectedCoverImage: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedCoverImage = input.files[0];
        console.log(this.selectedCoverImage);
        this.addForm.patchValue({ cover_image: this.selectedCoverImage });
        this.addForm.get('cover_image')?.updateValueAndValidity();
        console.log("cover_image у FormGroup:", this.addForm.get('cover_image')?.value);
    }
  }


  // constructor(private formBuilder : FormBuilder, private modalService : BsModalService, private dataService : DataService) {
  //   this.addForm = formBuilder.group({
  //     title: ['', Validators.required],
  //     year: ['', Validators.required],
  //     revenue: ['', Validators.required],
  //     file: ['', Validators.required]
  //   });
  // }

  // onSubmit() {    
  //   if(this.addForm.valid) {
  //     const fileName : string = this.addForm.get('file')!.value.split('\\').pop();
  //     const fullPath : string = `assets/img/${fileName}`;
    
  //     const newMovie : Movie = this.createMovie(this.addForm.get('title')!.value, this.addForm.get('year')!.value, this.addForm.get('revenue')!.value, fullPath);
      
  //     //this.dataService.addNewMovie(newMovie);
      
  //     this.addForm.reset();
  //     this.modalRef!.hide();
  //   }
  // }


  // createMovie(
  //   title : string,
  //   year : number,
  //   revenue : number,
  //   posterPath : string) : Movie {
  //         const newMovie : Movie = {
  //           id: this.generateId(),
  //           title: title,
  //           year: year,
  //           revenue: revenue,
  //           posterPath: posterPath,
  //           dateOfAdding: new Date(),
  //           isAdded: true,
  //           isAddedToFavorites: false
  //       };

  //       return newMovie;
  // }

  // generateId() : number {
  //   return Math.floor(Math.random() * 128723873) + 1;
  // }
}
