import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Specialty } from '../../../core/models/specialty.model';
import { Doctor } from '../../../core/models/doctor.model';
import { TimeSlot } from '../../../core/models/time-slot.model';
import { Appointment } from '../../../core/models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {
  private api = inject(ApiService);

  getSpecialties(): Observable<Specialty[]> {
    return this.api.getSpecialties();
  }

  getDoctors(specialtyId?: string, query?: string): Observable<Doctor[]> {
    return this.api.getDoctors(specialtyId, query);
  }

  getDoctorById(id: string): Observable<Doctor | undefined> {
    return this.api.getDoctorById(id);
  }

  getTimeSlots(doctorId: string, date: string): Observable<TimeSlot[]> {
    return this.api.getTimeSlots(doctorId, date);
  }

  confirmBooking(appointmentData: Omit<Appointment, 'id' | 'appointmentCode' | 'createdAt' | 'status' | 'qrCodeData'>): Observable<Appointment> {
    return this.api.createAppointment(appointmentData);
  }
}
