import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Movie } from 'src/app/entities/Movie';
import { MovieCreate } from 'src/app/entities/MovieCreate';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = "http://localhost:9000/films";

  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  movies$ : Observable<Movie[]> = this.moviesSubject.asObservable();



  private titleToSearchBy = new BehaviorSubject<string>('');
  titleToSearchBy$ = this.titleToSearchBy.asObservable();

  constructor(private http: HttpClient, private userService : UserService) { 
    this.getMovies()
  }

  getMovies(): void {
    this.http.get<Movie[]>(`${this.apiURL}/`).subscribe(
      movies => this.moviesSubject.next(movies), // Оновлюємо BehaviorSubject
      error => console.error('Error fetching movies', error)
    );
  }
  
  getMovieById(id : number): Observable<any> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  updateTitleToSearchBy(title : string) {
    this.titleToSearchBy.next(title);
  }

  updateMovie(movieId : number, updatedMovie: MovieCreate): Observable<any> {
    const token = this.userService.getTokenFromStorage();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log(updatedMovie);

    return this.http.put(`${this.apiURL}/${movieId}`, updatedMovie, { reportProgress:true });
  }

  addMovie(movie: MovieCreate): Observable<MovieCreate> {
    const token = this.userService.getTokenFromStorage();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });


    return this.http.post<MovieCreate>(`${this.apiURL}/`, movie, { headers }).pipe(
      tap(() => this.getMovies())
    );
  }


  

  deleteMovie(movieId: number): Observable<any> {
    const token = this.userService.getTokenFromStorage();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log(`${this.apiURL}/${movieId}`)
    return this.http.delete(`${this.apiURL}/${movieId}`).pipe(
      catchError((error) => {
        console.error('Error deleting resource', error);
        return throwError(() => error);
      })); 
    }
}
