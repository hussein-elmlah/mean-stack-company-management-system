import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserSignupComponent } from './signup/userSignup/userSignup.component';
import { MainComponent } from './home/main/main.component';
import { ContactComponent } from './home/contact/contact.component';
import { PortfolioComponent } from './home/portfolio/portfolio.component';
import { ServicesComponent } from './home/services/services.component';
import { AboutComponent } from './home/about/about.component';
import { EmployeeSignupComponent } from './signup/employeeSignup/employeeSignup.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Home page',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'contact page',
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    title: 'portfolio page',
  },
  {
    path: 'services',
    component: ServicesComponent,
    title: 'services page',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'about Us page',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login page',
  },
  {
    path: 'usersignup',
    component: UserSignupComponent,
    title: 'user signup page',
  },
  {
    path: 'employeesignup',
    component: EmployeeSignupComponent,
    title: 'employee signup page',
  },
];
