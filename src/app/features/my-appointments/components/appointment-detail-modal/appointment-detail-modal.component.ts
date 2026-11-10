import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../../../../core/models/appointment.model';
import { VndCurrencyPipe } from '../../../../shared/pipes/vnd-currency.pipe';

@Component({
  selector: 'app-appointment-detail-modal',
  standalone: true,
  imports: [VndCurrencyPipe],
  templateUrl: './appointment-detail-modal.component.html',
  styleUrl: './appointment-detail-modal.component.scss'
})
export class AppointmentDetailModalComponent {
  @Input() appointment: Appointment | null = null;
  @Input() isOpen = false;

  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<Appointment>();

  onClose(): void {
    this.close.emit();
  }

  onCancelApt(): void {
    if (this.appointment) {
      this.cancel.emit(this.appointment);
    }
  }

  printTicket(): void {
    window.print();
  }
}
