import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Trip } from '../data/trip';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css']
})
export class EditTrip implements OnInit {
  message = '';
  originalTripCode = '';

  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    const tripCode = this.route.snapshot.paramMap.get('tripCode');

    if (!tripCode) {
      this.message = 'No trip code was provided.';
      return;
    }

    this.originalTripCode = tripCode;

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (trip: Trip) => {
        this.trip = {
          ...trip,
          start: trip.start ? trip.start.substring(0, 10) : ''
        };
      },
      error: (err) => {
        this.message = `Unable to load trip ${tripCode}.`;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    this.tripDataService.updateTrip(this.originalTripCode, this.trip).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = 'Unable to update trip.';
        console.error(err);
      }
    });
  }
}
