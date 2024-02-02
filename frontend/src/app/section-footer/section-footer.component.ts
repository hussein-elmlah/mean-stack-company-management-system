import { Component } from '@angular/core';
// fontAwesome start
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faInstagram,
  faLinkedin,
  faGithub} from '@fortawesome/free-brands-svg-icons';
  
// fontAwesome end

@Component({
  selector: 'app-section-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './section-footer.component.html',
  styleUrl: './section-footer.component.css'
})
export class SectionFooterComponent {
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faCoffee = faCoffee;
}
