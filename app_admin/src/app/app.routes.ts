import { Routes } from '@angular/router';

import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';
import { AuthGuard } from './services/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: TripListing,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddTrip,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:tripCode',
    component: EditTrip,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: Login
  }
];