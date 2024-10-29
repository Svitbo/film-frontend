import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from 'src/app/entities/User';
import { UserCreate } from 'src/app/entities/UserCreate';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = "/api/";

  private favoriteMoviesSubject = new BehaviorSubject<any>([]);
  favoriteMovies$ : Observable<any> = this.favoriteMoviesSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(newUser: UserCreate): any {
    return this.http.post(`${this.apiURL}/register`, newUser).pipe(
      tap(() => {
        this.getToken(newUser.username, newUser.password).subscribe(
          (response) => {
            console.log('Success:', response);
            this.saveToken(response.access_token);
            this.getFavoriteFilms();
          }
        );
      })
    );
  }

  getToken(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<any>(`${this.apiURL}/token`, body.toString(), { headers }).pipe(
      tap(response => {
        console.log('Success:', response);
        this.saveToken(response.access_token);
        this.getFavoriteFilms();
      })
    );
  }
 
  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getTokenFromStorage(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserRole(): string {
    const token = this.getTokenFromStorage();
    
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role;
    }
    return '';
  }

  getUserId(): number {
    const token = this.getTokenFromStorage();
    
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log(parseInt(decodedToken.id));
      return parseInt(decodedToken.id);

    }
    return 0;
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn() : boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    }
    return false;
  }

  getFavoriteFilms() {
    const token = this.getTokenFromStorage();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.apiURL}/favorites`, { headers }).subscribe(
      movies => this.favoriteMoviesSubject.next(movies),
      error => console.error('Error fetching movies', error)
    );
  }

  addFavoriteFilm(userId: number, filmId: number): Observable<any> {
    const token = this.getTokenFromStorage();
    console.log('Token:', token);
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post(`${this.apiURL}/users/${userId}/favorites/${filmId}`, {}, { headers })
      .pipe(
        catchError(error => {
          console.error('Error adding movie to favorites:', error);
          return throwError(error);
        })
      );
  }

  deleteFavoriteFilm(userId: number, filmId: number): Observable<any> {
    const token = this.getTokenFromStorage();
    console.log('Token:', token);
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete(`${this.apiURL}/users/${userId}/favorites/${filmId}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error adding movie to favorites:', error);
          return throwError(error);
        })
      );
  }
}
