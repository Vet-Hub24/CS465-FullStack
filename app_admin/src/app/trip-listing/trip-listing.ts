import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../data/trip';
import { TripDataService } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, RouterLink, TripCard],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css']
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message = '';

  constructor(
    private tripDataService: TripDataService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (trips: Trip[]) => {
        this.trips = trips;
        this.message = '';
        this.changeDetector.detectChanges();
      },
      error: (err) => {
        console.error('Trip API error:', err);
        this.message = 'Unable to load trips from the API.';
        this.changeDetector.detectChanges();
      }
    });
  }

  deleteTrip(tripCode: string): void {
    const confirmed = confirm(`Delete trip ${tripCode}?`);

    if (!confirmed) {
      return;
    }

    this.tripDataService.deleteTrip(tripCode).subscribe({
      next: () => {
        this.loadTrips();
      },
      error: (err) => {
        console.error(err);
        this.message = `Unable to delete trip ${tripCode}.`;
        this.changeDetector.detectChanges();
      }
    });
  }
}
