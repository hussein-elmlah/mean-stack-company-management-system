import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import Project from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private apiService: ApiService) { }

  getAllProjects(page: number = 0, limit: number = 30): Observable<{ projects: Project[], totalCount: number }> {
    return this.apiService.get(`projects?page=${page}&limit=${limit}`).pipe(
      map((response) => {
        return {
          projects: response.projects,
          totalCount: response.totalCount
        };
      }),
      catchError((error) => {
        console.error('Error occurred while fetching projects:', error);
        return throwError(() => new Error('Failed to fetch projects. Please try again later.'));
      })
    );
  }

  getProject(projectId: string): Observable<Project> {
    return this.apiService.get(`projects/${projectId}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching project:', error);
        return throwError(() => new Error('Failed to fetch project. Please try again later.'));
      })
    );
  }

  createProject(projectData: Project): Observable<any> {
    return this.apiService.post('projects', projectData).pipe(
      catchError((error) => {
        console.error('Error occurred while creating project:', error);
        return throwError(() => new Error('Failed to create project. Please try again later.'));
      })
    );
  }

  updateProject(projectId: string, projectData: Project): Observable<any> {
    return this.apiService.put(`projects/${projectId}`, projectData).pipe(
      catchError((error) => {
        console.error('Error occurred while updating project:', error);
        return throwError(() => new Error('Failed to update project. Please try again later.'));
      })
    );
  }

  deleteProject(projectId: string): Observable<any> {
    return this.apiService.delete(`projects/${projectId}`).pipe(
      catchError((error) => {
        console.error('Error occurred while deleting project:', error);
        return throwError(() => new Error('Failed to delete project. Please try again later.'));
      })
    );
  }
}
