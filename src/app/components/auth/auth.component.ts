import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/entities/User';
import { UserCreate } from 'src/app/entities/UserCreate';
import { UserService } from 'src/app/services/user/user.service';
import { passwordChecking } from 'src/app/validators/PasswordsChecking';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authForm : FormGroup;
  modalRef? : BsModalRef;

  isLoggedIn = false;

  user! : User;

  passwordPattern : any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*_.])[A-Za-z\d@*_.!$;:%^]{6,}$/;

  constructor(private formBuilder : FormBuilder, private modalService : BsModalService, private userService : UserService, private router : Router) {
    this.authForm = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['']
    },
    {
      validator: [passwordChecking]
    });
  }

  ngOnInit() {
    //const role = localStorage.getItem('role');

    // if(role != null && role != 'Guest') {
    //   this.isLoggedIn = true;
    // } else this.isLoggedIn = false;
  }

  onSignUpSubmit() {
    if(this.authForm.valid) {
      const newUser : UserCreate = {
        username: this.authForm.get('username')!.value,
        password: this.authForm.get('password')!.value
      };

      this.userService.register(newUser).subscribe({
        next: (response: any) => {
          console.log('User registered successfully:', response);
          // Тут можете виконати дії після успішної реєстрації
        },
        error: (err: any) => {
          console.error('Registration failed:', err);
        }
      });

      this.authForm.reset();
      this.isLoggedIn = true;
      this.modalRef!.hide();

      this.router.navigate(['catalog']);
      console.log(newUser);
    }
    

  }

  onSignInSubmit() {
    // const newUser : User = this.createUser(this.authForm.get('username')!.value, this.authForm.get('password')!.value);
  
    // this.userService.checkUser(newUser.username, newUser.password);
  
    
    // if(localStorage.getItem('role') != 'Guest' && localStorage.getItem('role') != null) {
    //   this.isLoggedIn = true;
    //   this.authForm.reset();
    //   this.modalRef!.hide();
    // }
    
    // this.router.navigate(['catalog']);
  }

  createUser(username : string, password : string) {
    // let user = {
    //   id: this.generateId(),
    //   username: username,
    //   password: password,
    //   role: 'User'
    // }

    // return user;
  }

  generateId() {
    // return Math.floor(Math.random() * 100) + 1;
  }

  openModal(template : TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }

  logout() {
    // this.isLoggedIn = false;
    // localStorage.setItem('role', 'Guest');
    // this.router.navigate(['catalog']);
  }
}
