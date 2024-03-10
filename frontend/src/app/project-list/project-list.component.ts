import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllProjects(this.currentPage, 10).subscribe(
      (response: any) => {
        this.projects = response.projects;
        this.totalPages = response.totalPages;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAllProjects();
  }
}
