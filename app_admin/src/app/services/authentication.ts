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

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  }

  public getCurrentUser(): string {
    if (!this.isLoggedIn()) {
      return '';
    }

    const token = this.getToken();
    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.name || payload.email;
  }
}