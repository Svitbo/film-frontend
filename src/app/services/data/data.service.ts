import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Movie } from 'src/app/entities/Movie';
import { MovieCreate } from 'src/app/entities/MovieCreate';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = "/api/films/";

  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  movies$ : Observable<Movie[]> = this.moviesSubject.asObservable();

  private titleToSearchBy = new BehaviorSubject<string>('');
  titleToSearchBy$ = this.titleToSearchBy.asObservable();

  constructor(private http: HttpClient, private userService : UserService) { 
    this.getMovies()
  }

  getMovies(): void {
    this.http.get<Movie[]>(`${this.apiURL}/`).subscribe(
      movies => this.moviesSubject.next(movies),
      error => console.error('Error fetching movies', error)
    );
  }
  
  getMovieById(id : number): Observable<any> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  updateTitleToSearchBy(title : string) {
    this.titleToSearchBy.next(title);
  }

  addMovie(movie: MovieCreate, coverImage: FormData): Observable<Movie> {
    const token = this.userService.getTokenFromStorage();
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post<Movie>(`${this.apiURL}/`, movie, { headers }).pipe(
      switchMap((newMovie: Movie) => {
        return this.uploadCoverImage(newMovie.id, coverImage).pipe(
          tap((response) => {
            console.log('Cover image uploaded successfully:', response);
          }),
          map(() => newMovie)
        );
      }),
      tap(() => {
        this.getMovies();
      }),
      catchError((error) => {
        console.error('Error uploading cover image:', error.detail);
        return throwError(error);
      })
    );
  }

  updateMovie(movieId : number, updatedMovie: MovieCreate): Observable<any> {
    const token = this.userService.getTokenFromStorage();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiURL}/${movieId}`, updatedMovie, { headers }).pipe(
      tap(() => this.getMovies())
    );
  }

  deleteMovie(movieId: number): Observable<any> {
    const token = this.userService.getTokenFromStorage();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.apiURL}/${movieId}`, { headers }).pipe(
      tap(() => this.getMovies())
    );
  }

  uploadCoverImage(filmId: number, coverImage: FormData): Observable<any> {
    const token = this.userService.getTokenFromStorage();
    
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.apiURL}/${filmId}/upload-cover`, coverImage, { headers });
  }

  getSortedFilms(sortBy: string, sortOrder: string = 'asc'): Observable<Movie[]> {
    let params = new HttpParams()
      .set('sort_by', sortBy)
      .set('sort_order', sortOrder);

    return this.http.get<Movie[]>(`${this.apiURL}/`, { params });
  }
}
