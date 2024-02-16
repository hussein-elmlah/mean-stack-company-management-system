import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule , NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  constructor(private router: Router){
    this.loginForm = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.minLength(8)]),
    })
  }

  handleloginform(){
    console.log(this.loginForm);
    this.router.navigate(['/']);
    setTimeout(() => {
      alert("congratulation ... you entered right info ...")
    }, 1000);
  }
}
