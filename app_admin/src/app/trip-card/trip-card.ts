import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Trip } from '../data/trip';

@Component({
  selector: 'app-trip-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  @Input() trip!: Trip;
  @Output() deleteTrip = new EventEmitter<string>();

  onDelete(): void {
    this.deleteTrip.emit(this.trip.code);
  }
}