import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { Movie } from 'src/app/entities/Movie';
import { MovieCreate } from 'src/app/entities/MovieCreate';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = "http://localhost:9000/films";

  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  movies$ : Observable<any[]> = this.moviesSubject.asObservable();


  private titleToSearchBy = new BehaviorSubject<string>('');
  titleToSearchBy$ = this.titleToSearchBy.asObservable();

  constructor(private http: HttpClient) { }

  
  getMovies(): Observable<any> {
    return this.http.get(`${this.apiURL}/`);
  }

  getMovieById(id : number): Observable<any> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  updateTitleToSearchBy(title : string) {
    this.titleToSearchBy.next(title);
  }

  addMovie(movie: MovieCreate): Observable<MovieCreate> {
    return this.http.post<MovieCreate>(`${this.apiURL}/`, movie);
  }





























  // private movieToEdit = new BehaviorSubject<Movie | null>(null);
  // movieToEdit$ : Observable<Movie | null> = this.movieToEdit.asObservable();

  // private apiKey: string = '3d76fda2ee211a24458607415201b5b3';

  // getSearchTerm() : Observable<string> {
  //   return this.searchSubject.asObservable();
  // }

  
  // constructor(private http : HttpClient) {
  //   const moviesLocalStorage = localStorage.getItem('movies');
  //   if(moviesLocalStorage != null) {
  //     this.moviesSubject.next(JSON.parse(moviesLocalStorage));
  //   } else {
  //     this.fetchMoviesData();
  //   }
  // }

  // getMovies(page : number) : Observable<any> {
  //   const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&api_key=${this.apiKey}`;
  //   return this.http.get<any>(url).pipe(map(response => response.results));
  // }

  // getMovieInfo(id : number) : Observable<any> {
  //   const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${this.apiKey}&append_to_response=revenue`;
  //   return this.http.get(url);
  // }

  // fetchMoviesData() : void {
  //   const observables = [];
  //   for (let i = 1; i <= 10; i++) {
  //     observables.push(this.getMovies(i));
  //   }

  //   forkJoin(observables).subscribe((responses: any[]) => {
  //     const movies = responses.flat(); // Отримання всіх фільмів з різних сторінок
  //     const movieInfos = movies.map((movie: any) => this.getMovieInfo(movie.id));

  //     forkJoin(movieInfos).subscribe((infoResponses: any[]) => {
  //       const moviesWithInfo = movies.map((movie: any, index: number) => {
  //         const { id, title, release_date, poster_path } = movie;
  //         const revenue = infoResponses[index].revenue || 0;
  //         return {
  //           id,
  //           title,
  //           year: new Date(release_date).getFullYear(),
  //           revenue,
  //           posterPath: `https://image.tmdb.org/t/p/w500${poster_path}`,
  //           dateOfAdding: new Date(release_date),
  //           isAdded: false,
  //           isAddedToFavorites: false
  //         };
  //       });

  //       localStorage.setItem('movies', JSON.stringify(moviesWithInfo));
  //       this.moviesSubject.next(moviesWithInfo);
  //     });
  //   });
  // }

  // addedToFavorites(id : number, isAdded : boolean) : void {
  //   let movies = JSON.parse(localStorage.getItem('movies')!);
    
  //   const updatedMovies = movies!.map((movie : Movie) => {
  //     if (movie.id === id) {
  //       movie.isAddedToFavorites = isAdded; // Оновлюємо значення поля isAddedToFavorites
  //     }
  //     return movie;
  //   });

  //   localStorage.setItem('movies', JSON.stringify(updatedMovies));
  //   this.moviesSubject.next(updatedMovies);
  // }

  // findByTitle(title : string) : void {
  //   const movies = JSON.parse(localStorage.getItem('movies')!);
    
  //   const result = movies.filter((movie : Movie) => {
  //     return movie.title.toLowerCase().includes(title.toLowerCase());
  //   });
    
  //   this.moviesSubject.next(result);
  // }

  // addNewMovie(movie : Movie) : void {
  //   const movies = JSON.parse(localStorage.getItem('movies')!);

  //   const updatedMovies = [movie, ...movies];
  //   localStorage.setItem('movies', JSON.stringify(updatedMovies));
  //   this.moviesSubject.next(updatedMovies);
  // }

  // deleteMovie(id : number) : void {
  //   let movies = JSON.parse(localStorage.getItem('movies')!);

  //   movies = movies.filter((m: Movie) => m.id !== id);

  //   localStorage.setItem('movies', JSON.stringify(movies));
  //   console.log(movies);
    
  //   this.moviesSubject.next(movies);
  // }

  // updateMovie(updatedMovie : Movie): void {
  //   let movies = JSON.parse(localStorage.getItem('movies') || '[]') as Movie[];
  
  //   movies = movies.map((movie: Movie) => {
  //     if (movie.id === updatedMovie.id) {
  //       return updatedMovie;
  //     }
  //     return movie;
  //   });
  
  //   localStorage.setItem('movies', JSON.stringify(movies));
  //   console.log(movies);
    
  //   this.moviesSubject.next(movies);
  // }

  // setMovieToEdit(movie : Movie) : void {
  //   console.log(movie);
  //   this.movieToEdit.next(movie);
    
    
    
  // }

}
