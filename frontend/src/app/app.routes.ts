import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './home/main/main.component';
import { ContactComponent } from './home/contact/contact.component';
import { PortfolioComponent } from './home/portfolio/portfolio.component';
import { ServicesComponent } from './home/services/services.component';
import { AboutComponent } from './home/about/about.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { UserSignupComponent } from './signup/userSignup/userSignup.component';
import { EmployeeSignupComponent } from './signup/employeeSignup/employeeSignup.component';
import { AddProjectComponent } from './client/add-project/add-project.component';
import { ViewProjectsComponent } from './client/view-projects/view-projects.component';
import { TrackedProjectsComponent } from './tracked-projects/tracked-projects.component';

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
    title: 'signup page',
  },
  {
    path: 'addclientproject',
    component: AddProjectComponent,
    title: 'add project'
  },
  {
    path: 'viewclientprojects',
    component: ViewProjectsComponent,
    title: 'view project'
  },
  {
    path: 'trackedprojects',
    component: TrackedProjectsComponent,
    title: 'TrackedProjectsComponent page',
  },
  {
    path: 'test', // this route should be deleted in production.
    component: ProjectListComponent,
    title: 'test page',
  },
];
