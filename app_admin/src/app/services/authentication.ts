import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../data/user';
import { AuthResponse } from '../data/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiBaseUrl = 'http://localhost:3000/api';
  private tokenKey = 'travlr-token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/login`, user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/register`, user);
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  private decodeToken(): any | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const parts = token.split('.');

      if (parts.length !== 3) {
        return null;
      }

      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const decoded = decodeURIComponent(
        atob(payload)
          .split('')
          .map(char => `%${('00' + char.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );

      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const payload = this.decodeToken();

    if (!payload || typeof payload.exp !== 'number') {
      return false;
    }

    return payload.exp > Date.now() / 1000;
  }

  public getCurrentUser(): string {
    const payload = this.decodeToken();

    if (!payload || !this.isLoggedIn()) {
      return '';
    }

    return payload.name || payload.email || '';
  }
}