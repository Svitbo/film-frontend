import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { UserCreate } from 'src/app/entities/UserCreate';

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