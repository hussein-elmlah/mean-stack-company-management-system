import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import User from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './usersignup.component.html',
  styleUrl: './usersignup.component.css',
})
export class UserSignupComponent {
  signUpForm!: FormGroup;
  newUser!: User;
  constructor(private router: Router, private userServices: UserService) {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  handleFormSubmit() {
    console.log(this.signUpForm.value);
    this.userServices.createUser(this.signUpForm.value).subscribe(
      (response) => {
        console.log('Login successful:', response);
        alert('congratulation,you signed up successfully.');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
