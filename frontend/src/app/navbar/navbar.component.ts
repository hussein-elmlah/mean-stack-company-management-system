import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// import { DropdownModule } from 'primeng/dropdown';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  viewLogin() {
    this.router.navigate(['/login']);
  }

  userSignup() {
    this.router.navigate(['/usersignup']);
  }
  employeeSignup() {
    this.router.navigate(['/employeesignup']);
  }
}
