import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { User } from '../data/user';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  message = '';

  credentials: User = {
    email: 'jake@example.com',
    password: 'password123'
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onLoginSubmit(): void {
    this.authenticationService.login(this.credentials).subscribe({
      next: (authResponse) => {
        this.authenticationService.saveToken(authResponse.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = 'Login failed. Check the email and password.';
        console.error(err);
      }
    });
  }

  onRegisterSubmit(): void {
    const newUser: User = {
      name: 'Jake Admin',
      email: this.credentials.email,
      password: this.credentials.password
    };

    this.authenticationService.register(newUser).subscribe({
      next: (authResponse) => {
        this.authenticationService.saveToken(authResponse.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = 'Register failed. The user may already exist.';
        console.error(err);
      }
    });
  }
}