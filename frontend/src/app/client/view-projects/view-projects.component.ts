import { Component } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';
import Project from '../../../interfaces/project.interface';

@Component({
  selector: 'app-view-projects',
  standalone: true,
  imports: [],
  templateUrl: './view-projects.component.html',
  styleUrl: './view-projects.component.css'
})
export class ViewProjectsComponent {

  constructor(private router: Router, private projectService: ProjectService) {};

  isLoggedIn: boolean = false;
  token: any = localStorage.getItem('token');
  id !: String;
  projects: Array<Project> = [];

  ngOnInit() {

    const token = localStorage.getItem('token');
    this.isLoggedIn = Boolean(token);
    if (token) {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      this.id = payload.id;
      this.projectService.getAllProjects(0,30,this.id).subscribe((res) => {
        this.projects = res.projects
        console.log(res)
      })
      console.log('Current id:', this.id);
  }
  
}


checkLogin() {
  if(!this.isLoggedIn) {
    this.router.navigate(['/login']).then();
  }
}


}
