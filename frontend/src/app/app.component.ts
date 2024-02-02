import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SectionFooterComponent } from './section-footer/section-footer.component';
import { SectionProjectsComponent } from './section-projects/section-projects.component';
import { SectionSkillsComponent } from './section-skills/section-skills.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AboutComponent,
    SectionSkillsComponent,
    SectionProjectsComponent,
    SectionFooterComponent,
    NavbarComponent ,
    CommonModule,
    HttpClientModule],
    providers:[

    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
}
