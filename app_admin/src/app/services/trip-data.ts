import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../data/trip';
import { AuthenticationService } from './authentication';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private readonly apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authenticationService.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}/trips/${encodeURIComponent(tripCode)}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}/trips`, trip, { headers: this.getAuthHeaders() });
  }

  updateTrip(tripCode: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(tripCode)}`,
      trip,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteTrip(tripCode: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiBaseUrl}/trips/${encodeURIComponent(tripCode)}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
