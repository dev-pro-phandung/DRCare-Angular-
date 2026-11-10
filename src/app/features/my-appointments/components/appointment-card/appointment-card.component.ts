import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../../../../core/models/appointment.model';
import { VndCurrencyPipe } from '../../../../shared/pipes/vnd-currency.pipe';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [VndCurrencyPipe],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss'
})
export class AppointmentCardComponent {
  @Input({ required: true }) appointment!: Appointment;
  @Output() viewDetails = new EventEmitter<Appointment>();
  @Output() cancel = new EventEmitter<Appointment>();

  onView(): void {
    this.viewDetails.emit(this.appointment);
  }

  onCancel(): void {
    this.cancel.emit(this.appointment);
  }
}
