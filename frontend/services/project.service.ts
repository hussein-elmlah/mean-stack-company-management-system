import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private apiService: ApiService) { }

  getAllProjects(page: number = 0, limit: number): Observable<any> {
    return this.apiService.get(`projects?page=${page}&limit=${limit}`);
  }

  createProject(projectData: any): Observable<any> {
    return this.apiService.post('projects', projectData);
  }

  updateProject(projectId: string, projectData: any): Observable<any> {
    return this.apiService.put(`projects/${projectId}`, projectData);
  }

  deleteProject(projectId: string): Observable<any> {
    return this.apiService.delete(`projects/${projectId}`);
  }
}
