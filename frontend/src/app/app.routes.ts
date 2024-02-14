import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        title:"Home page"
    },
    {
        path:'login',
        component:LoginComponent,
        title:"login page"
    },
    {
        path:'signup',
        component:SignupComponent,
        title:"signup page"
    }
];
