import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  providers: [ApiService] ,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  projects!: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllProjects().subscribe(data => {
      this.projects = data;
    });
  }

}


