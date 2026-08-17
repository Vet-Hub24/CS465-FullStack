import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Trip } from '../data/trip';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-trip.html',
  styleUrls: ['./add-trip.css']
})
export class AddTrip {
  message = '';

  trip: Trip = {
    code: 'TEST' + Date.now(),
    name: 'Test Beach Escape',
    length: '4 nights / 5 days',
    start: '2026-09-01',
    resort: 'Test Resort, 4 stars',
    perPerson: '$999.00',
    image: 'reef1.jpg',
    description: 'Test Beach Escape: This sample trip was added through the Angular admin SPA.'
  };

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.tripDataService.addTrip(this.trip).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = 'Unable to add trip.';
        console.error(err);
      }
    });
  }
}
