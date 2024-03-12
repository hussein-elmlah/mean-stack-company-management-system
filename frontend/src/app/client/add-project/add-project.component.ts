import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Project from '../../../interfaces/project.interface';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  addProjectForm!: FormGroup;
  newproject!: Project;
  successmessage!:string;
  constructor(private router: Router, private projectService: ProjectService) {
    this.addProjectForm = new FormGroup({
      client:new FormControl({}),
      upper:new FormControl(false),
      land: new FormControl(false),
      owner: new FormControl(''),
      location: new FormControl(''),
      planNumber: new FormControl(''),
      plotNumber: new FormControl(''),
      landPerimeter: new FormControl(''),
      landArea: new FormControl(''),
      program: new FormControl(null),
      type: new FormControl(null),
      numberOfFloors: new FormControl(''),
      buildingArea: new FormControl(''),
      totalBuildingArea: new FormControl(''),
      description: new FormControl(''),
    });
  }

  isLoggedIn: boolean = false;
  token: any = localStorage.getItem('token');
  id !: String;
  username !: String
  mobileNumber !: String

  ngOnInit() {

    const token = localStorage.getItem('token');
    this.isLoggedIn = Boolean(token);
    if (token) {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      this.id = payload.id;
      this.username = payload.username
      this.mobileNumber = payload.mobileNumber
      console.log('Current id:', this.id);
      this.addProjectForm.get('client')?.setValue({
        user : this.id,
        fullName:this.username,
        mobileNumber:this.mobileNumber
      });
  }
  
}

 

  handleform() {
    let annex :object = {
      upper:this.addProjectForm.value.upper,
      land:this.addProjectForm.value.land
    }
    delete this.addProjectForm.value.upper;
    delete this.addProjectForm.value.land;
    this.addProjectForm.value.annex = annex;
    console.log(this.addProjectForm.value);
    console.log(annex)

    this.projectService.createProject(this.addProjectForm.value).subscribe(
      (response) => {
        console.log('project added successful:', response);
        this.addProjectForm.reset();
        this.addProjectForm.get('client')?.setValue({
          user : this.id,
          fullName:this.username
        });
        this.successmessage = 'تم اضافة المشروع بنجاح'
        setTimeout(() => {
          this.successmessage = ''
        }, 5000);
      },
      (error) => {
        console.error('add project error:', error);
      }
    );
  }

  checkLogin() {
    if(!this.isLoggedIn) {
      this.router.navigate(['/login']).then();
    }
  }

}
