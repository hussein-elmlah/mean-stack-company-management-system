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

@Component({
  selector: 'app-employee-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './employeeSignup.component.html',
  styleUrl: './employeeSignup.component.css',
})
export class EmployeeSignupComponent {
  signUpForm!: FormGroup;
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
        console.log(response.headers);
        // console.log('Login successful:', response);
        alert('congratulation,you signed up successfully.');
        this.signUpForm.reset();
      },
      (error) => {
        console.error('Signup error:', error);
      }
    );
  }
}
