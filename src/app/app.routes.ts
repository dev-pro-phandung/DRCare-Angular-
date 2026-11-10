import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'booking',
    loadChildren: () => import('./features/patient-booking/patient-booking.routes').then(m => m.PATIENT_BOOKING_ROUTES)
  },
  {
    path: 'my-appointments',
    loadChildren: () => import('./features/my-appointments/my-appointments.routes').then(m => m.MY_APPOINTMENTS_ROUTES)
  }
];
