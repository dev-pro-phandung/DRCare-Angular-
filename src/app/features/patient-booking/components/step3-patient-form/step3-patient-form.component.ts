import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BookingStateService } from '../../services/booking-state.service';
import { VndCurrencyPipe } from '../../../../shared/pipes/vnd-currency.pipe';

@Component({
  selector: 'app-step3-patient-form',
  standalone: true,
  imports: [VndCurrencyPipe],
  templateUrl: './step3-patient-form.component.html',
  styleUrl: './step3-patient-form.component.scss'
})
export class Step3PatientFormComponent {
  readonly state = inject(BookingStateService);
  private router = inject(Router);

  get appointment() {
    return this.state.confirmedAppointment();
  }

  viewMyAppointments(): void {
    this.router.navigate(['/my-appointments']);
  }

  bookNew(): void {
    this.state.reset();
  }

  printTicket(): void {
    window.print();
  }
}
