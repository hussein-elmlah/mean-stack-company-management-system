import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  viewLogin() {
    this.router.navigate(['/login']);
  }

  viewSignup() {
    this.router.navigate(['/signup']);
  }

  ngOnInit() {
    this.checkLoggedIn();
  }

  isLoggedIn: boolean = false;
  token: any = localStorage.getItem('token');
  role !: String;

  checkLoggedIn() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = Boolean(token);
    if (token) {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      this.role = payload.role;
      console.log('Current role:', this.role);
    }
  }

  logOut() {
    this.token = localStorage.removeItem('token');
    this.checkLoggedIn();
    window.location.reload();
  }
}
