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

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './usersignup.component.html',
  styleUrl: './usersignup.component.css',
})
export class UserSignupComponent {
  signUpForm!: FormGroup;
  constructor(private router: Router) {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  handleFormSubmit() {
    console.log(this.signUpForm);
    console.log(this.signUpForm.value);
    this.router.navigate(['/']);
  }
}
