import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { UserCreate } from 'src/app/entities/UserCreate';
import { jwtDecode } from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = "http://localhost:9000";

  private currentUser: User | null = null;


  constructor(private http: HttpClient) {}

  register(newUser : UserCreate) : any {
    return this.http.post(`${this.apiURL}/register`, newUser);
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getToken(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<any>(`${this.apiURL}/token`, body.toString(), { headers });
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








  // private usersSubject = new BehaviorSubject<User[]>([]);
  // users$ : Observable<User[]> = this.usersSubject.asObservable();

  // constructor() {
  //   const storedUsers = localStorage.getItem('users');
  //   if (storedUsers) {
  //     this.usersSubject.next(JSON.parse(storedUsers));
  //   } else {
  //     const users = [
  //       {
  //         id: 1,
  //         username: 'admin',
  //         password: 'admin1234',
  //         role: 'Admin'
  //       },
  //       {
  //         id: 2,
  //         username: 'qwerty12345',
  //         password: 'qwerty12345',
  //         role: 'User'
  //       }
  //     ];
  //     console.log(users);
      
  //     localStorage.setItem('role', 'Guest');
  //     localStorage.setItem('users', JSON.stringify(users));
  //     this.usersSubject.next(users);
  //   }
  // }


  // addUser(newUser: User): void {
  //   const storedUsers = JSON.parse(localStorage.getItem('users')!);

  //   const updatedUsers = [...storedUsers!, newUser];
  //   localStorage.setItem('role', newUser.role);
  //   localStorage.setItem('users', JSON.stringify(updatedUsers));
  //   this.usersSubject.next(updatedUsers);
  // }

  // changeUserRole(id : number, newRole : 'Admin' | 'Moderator' | 'User'): void {
  //   const storedUsers = JSON.parse(localStorage.getItem('users')!);

  //   const userIndex = storedUsers.findIndex((user : User) => user.id === id);

  //   if (userIndex !== -1) {
  //     storedUsers[userIndex].role = newRole;
  //     localStorage.setItem('users', JSON.stringify(storedUsers));
  //     this.usersSubject.next(storedUsers);
  //   }
  // }

  // checkUser(username : string, password : string) {
  //   const storedUsers = JSON.parse(localStorage.getItem('users')!);

  //   storedUsers.forEach((user : User) => {
  //     if(user.username == username && user.password == password) {
  //       console.log('user found');
        
  //       localStorage.setItem('role', user.role);
  //     }
  //   });
  // }
}