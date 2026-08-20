import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../data/user';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  message = '';
  isSubmitting = false;

  credentials: User = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onLoginSubmit(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.message = '';

    this.authenticationService.login(this.credentials).subscribe({
      next: authResponse => {
        this.authenticationService.saveToken(authResponse.token);
        this.router.navigate(['/']);
      },
      error: err => {
        this.message = err?.error?.message || 'Login failed. Check the email and password.';
        this.isSubmitting = false;
      }
    });
  }

  onRegisterSubmit(): void {
    if (this.isSubmitting) return;

    if (!this.credentials.name?.trim()) {
      this.message = 'Enter a name before registering a new administrator.';
      return;
    }

    this.isSubmitting = true;
    this.message = '';

    this.authenticationService.register(this.credentials).subscribe({
      next: authResponse => {
        this.authenticationService.saveToken(authResponse.token);
        this.router.navigate(['/']);
      },
      error: err => {
        this.message = err?.error?.message || 'Unable to register the administrator account.';
        this.isSubmitting = false;
      }
    });
  }
}
