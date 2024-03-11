import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private router: Router, private userService: UserService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  handleloginform() {
    console.log(this.loginForm.value);
    // this.router.navigate(['/']);

    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Login successful:', response);
        alert('congratulation,you logged in successfully.');
        // setTimeout(() => {
        //   this.router.navigate(['/']);
        // }, 1000);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
