import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
// import { BrowserModule } from '@angular/platform-browser';
import Project from '../../interfaces/project.interface';

@Component({
  selector: 'app-tracked-projects',
  standalone: true,
  imports: [
    // BrowserAnimationsModule,
    // BrowserModule,
    TableModule,
    FormsModule,
    CommonModule,
    MultiSelectModule,
    TagModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
  ],
  templateUrl: './tracked-projects.component.html',
  styleUrl: './tracked-projects.component.css',
})
export class TrackedProjectsComponent {
  projects!: Project[];

  ngOnInit() {
    this.projects = [
      {
        name: 'Project 1',
        number: 1,
        owner: 'Owner 1',
        expectedCompletionDate: new Date('2024-05-15'),
      },
      {
        name: 'Project 2',
        number: 2,
        owner: 'Owner 2',
        expectedCompletionDate: new Date('2024-06-20'),
      },
      {
        name: 'Project 3',
        number: 3,
        owner: 'Owner 3',
        expectedCompletionDate: new Date('2024-07-25'),
      },
      {
        name: 'Project 4',
        number: 4,
        owner: 'Owner 4',
        expectedCompletionDate: new Date('2024-08-30'),
      },
      {
        name: 'Project 5',
        number: 5,
        owner: 'Owner 5',
        expectedCompletionDate: new Date('2024-09-10'),
      },
      {
        name: 'Project 6',
        number: 6,
        owner: 'Owner 6',
        expectedCompletionDate: new Date('2024-10-15'),
      },
      {
        name: 'Project 7',
        number: 7,
        owner: 'Owner 7',
        expectedCompletionDate: new Date('2024-11-20'),
      },
      {
        name: 'Project 8',
        number: 8,
        owner: 'Owner 8',
        expectedCompletionDate: new Date('2024-12-25'),
      },
      {
        name: 'Project 9',
        number: 9,
        owner: 'Owner 9',
        expectedCompletionDate: new Date('2025-01-30'),
      },
      {
        name: 'Project 10',
        number: 10,
        owner: 'Owner 10',
        expectedCompletionDate: new Date('2025-02-05'),
      },
      {
        name: 'Project 11',
        number: 11,
        owner: 'Owner 11',
        expectedCompletionDate: new Date('2025-03-10'),
      },
      {
        name: 'Project 12',
        number: 12,
        owner: 'Owner 12',
        expectedCompletionDate: new Date('2025-04-15'),
      },
      {
        name: 'Project 13',
        number: 13,
        owner: 'Owner 13',
        expectedCompletionDate: new Date('2025-05-20'),
      },
      {
        name: 'Project 14',
        number: 14,
        owner: 'Owner 14',
        expectedCompletionDate: new Date('2025-06-25'),
      },
      {
        name: 'Project 15',
        number: 15,
        owner: 'Owner 15',
        expectedCompletionDate: new Date('2025-07-30'),
      },
    ];
  }

  clear(table: Table) {
    table.clear();
  }
}
