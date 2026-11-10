import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Appointment, AppointmentStatus } from '../../core/models/appointment.model';
import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';
import { AppointmentDetailModalComponent } from './components/appointment-detail-modal/appointment-detail-modal.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

type FilterTab = 'ALL' | AppointmentStatus;

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    AppointmentCardComponent,
    AppointmentDetailModalComponent,
    ConfirmDialogComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.scss'
})
export class MyAppointmentsComponent implements OnInit {
  private api = inject(ApiService);

  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  loading = true;

  activeTab: FilterTab = 'ALL';
  searchTerm = '';

  // Detail Modal
  selectedAppointment: Appointment | null = null;
  isDetailOpen = false;

  // Cancel Dialog
  isCancelDialogOpen = false;
  targetAppointmentToCancel: Appointment | null = null;
  cancelReason = 'Thay đổi lịch trình cá nhân';

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.api.getAppointments().subscribe(list => {
      this.appointments = list;
      this.applyFilter();
      this.loading = false;
    });
  }

  setTab(tab: FilterTab): void {
    this.activeTab = tab;
    this.applyFilter();
  }

  applyFilter(): void {
    let result = [...this.appointments];

    if (this.activeTab !== 'ALL') {
      result = result.filter(a => a.status === this.activeTab);
    }

    if (this.searchTerm.trim() !== '') {
      const q = this.searchTerm.toLowerCase().trim();
      result = result.filter(a =>
        a.appointmentCode.toLowerCase().includes(q) ||
        (a.doctorName ? a.doctorName.toLowerCase().includes(q) : false) ||
        (a.specialtyName ? a.specialtyName.toLowerCase().includes(q) : false) ||
        (a.hospital ? a.hospital.toLowerCase().includes(q) : false) ||
        a.patient.fullName.toLowerCase().includes(q)
      );
    }

    this.filteredAppointments = result;
  }

  openDetail(apt: Appointment): void {
    this.selectedAppointment = apt;
    this.isDetailOpen = true;
  }

  closeDetail(): void {
    this.isDetailOpen = false;
    this.selectedAppointment = null;
  }

  requestCancel(apt: Appointment): void {
    this.targetAppointmentToCancel = apt;
    this.isCancelDialogOpen = true;
  }

  onConfirmCancel(): void {
    if (!this.targetAppointmentToCancel) return;

    this.api.cancelAppointment(this.targetAppointmentToCancel.id, this.cancelReason).subscribe(success => {
      if (success) {
        this.isCancelDialogOpen = false;
        this.targetAppointmentToCancel = null;
        this.closeDetail();
        this.loadAppointments();
      }
    });
  }

  onDismissCancel(): void {
    this.isCancelDialogOpen = false;
    this.targetAppointmentToCancel = null;
  }

  getCountByStatus(status: AppointmentStatus): number {
    return this.appointments.filter(a => a.status === status).length;
  }
}
