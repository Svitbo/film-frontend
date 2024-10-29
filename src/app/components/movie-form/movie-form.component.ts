import { Component, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

  selectedCoverImage: File | null = null;

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

  onSubmit() {
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

      this.dataService.addMovie(newMovie, formData).subscribe(
        (response) => {
          console.log('Movie added:', response);
        },
        (error) => {
          console.error('Error adding movie:', error);
        }
      );
      this.modalRef?.hide();
      this.addForm.reset();
  } else {
      console.log('invalid');
      this.addForm.markAllAsTouched();
  }
  }

  openModal(template : TemplateRef<any> | undefined) {
    this.modalRef = this.modalService.show(template!);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedCoverImage = input.files[0];

        this.addForm.patchValue({ cover_image: this.selectedCoverImage });
        this.addForm.get('cover_image')?.updateValueAndValidity();
    }
  }
}
