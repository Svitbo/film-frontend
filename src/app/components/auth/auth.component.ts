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
  signInForm: FormGroup;
  signUpForm: FormGroup;
  modalRef? : BsModalRef;

  user! : User;

  passwordPattern : any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*_.])[A-Za-z\d@*_.!$;:%^]{6,}$/;

  constructor(private formBuilder : FormBuilder, 
    private modalService : BsModalService, 
    private userService : UserService, 
    private router : Router) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['']
    }, {
      validator: passwordChecking
    });

    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignUpSubmit() {
    if(this.signUpForm.valid) {
      const newUser : UserCreate = {
        username: this.signUpForm.get('username')!.value,
        password: this.signUpForm.get('password')!.value
      };

      this.userService.register(newUser).subscribe({
        next: (response: any) => {
          console.log('User registered successfully:', response);
        },
        error: (err: any) => {
          console.error('Registration failed:', err);
        }
      });

      this.signUpForm.reset();
      this.modalRef?.hide();
    }
    
  }

  onSignInSubmit() {
    if (this.signInForm.valid) {
      const username = this.signInForm.get('username')?.value;
      const password = this.signInForm.get('password')?.value;
  
      this.userService.getToken(username, password).subscribe({
        next: (response) => {
          console.log('Logged in successfully:', response);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });

      this.signInForm.reset();
      this.modalRef?.hide();
    } else {
      console.log('Form is invalid');
    }
  }

  openModal(template : TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/catalog']);
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
