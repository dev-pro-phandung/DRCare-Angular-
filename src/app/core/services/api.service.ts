import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Specialty } from '../models/specialty.model';
import { Doctor } from '../models/doctor.model';
import { TimeSlot } from '../models/time-slot.model';
import { Appointment } from '../models/appointment.model';
import { Province, MedicalFacility, ExamService, ClinicRoom, PatientProfileOption } from '../models/csyt.model';
import { MockDataService } from './mock-data.service';

const STORAGE_KEY_APPOINTMENTS = 'drcare_appointments_data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private mockData: MockDataService) {
    this.initStorageIfEmpty();
  }

  private initStorageIfEmpty(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existing = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
      if (!existing) {
        const initial = this.mockData.getInitialAppointments();
        localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(initial));
      }
    }
  }

  getProvinces(): Observable<Province[]> {
    return of(this.mockData.PROVINCES).pipe(delay(100));
  }

  getFacilities(provinceId?: string): Observable<MedicalFacility[]> {
    let list = this.mockData.FACILITIES;
    if (provinceId) {
      list = list.filter(f => f.provinceId === provinceId);
    }
    return of(list).pipe(delay(150));
  }

  getExamServices(): Observable<ExamService[]> {
    return of(this.mockData.EXAM_SERVICES).pipe(delay(100));
  }

  getClinicRooms(facilityId?: string): Observable<ClinicRoom[]> {
    let list = this.mockData.CLINIC_ROOMS;
    if (facilityId) {
      list = list.filter(r => r.facilityId === facilityId);
    }
    return of(list).pipe(delay(150));
  }

  getPatientProfiles(): Observable<PatientProfileOption[]> {
    return of(this.mockData.PATIENT_PROFILES).pipe(delay(100));
  }

  getSpecialties(): Observable<Specialty[]> {
    return of(this.mockData.SPECIALTIES).pipe(delay(100));
  }

  getDoctors(facilityId?: string, specialtyId?: string): Observable<Doctor[]> {
    let list = [...this.mockData.DOCTORS];
    return of(list).pipe(delay(150));
  }

  getDoctorById(id: string): Observable<Doctor | undefined> {
    const found = this.mockData.DOCTORS.find(d => d.id === id);
    return of(found).pipe(delay(100));
  }

  getTimeRanges(): Observable<{ value: string; label: string }[]> {
    return of(this.mockData.TIME_RANGES).pipe(delay(100));
  }

  getTimeSlots(doctorId: string, dateStr: string): Observable<TimeSlot[]> {
    const slots = this.mockData.generateSlotsForDoctor(doctorId, dateStr);
    return of(slots).pipe(delay(200));
  }

  getAppointments(): Observable<Appointment[]> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const data = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
        if (data) {
          const list: Appointment[] = JSON.parse(data);
          return of(list).pipe(delay(150));
        }
      }
    } catch (e) {
      console.error('Error reading localStorage appointments', e);
    }
    return of(this.mockData.getInitialAppointments()).pipe(delay(150));
  }

  createAppointment(appointment: Omit<Appointment, 'id' | 'appointmentCode' | 'createdAt' | 'status' | 'qrCodeData'>): Observable<Appointment> {
    const randomCode = 'DRC-' + Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      ...appointment,
      id: 'apt-' + Date.now(),
      appointmentCode: randomCode,
      status: 'UPCOMING',
      qrCodeData: `DRC:${randomCode}|FAC:${appointment.hospital}|DATE:${appointment.date}|PATIENT:${appointment.patient.fullName}`,
      createdAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const data = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
        const list: Appointment[] = data ? JSON.parse(data) : [];
        list.unshift(newAppointment);
        localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(list));
      } catch (e) {
        console.error('Error saving appointment', e);
      }
    }

    return of(newAppointment).pipe(delay(300));
  }

  cancelAppointment(appointmentId: string, reason: string): Observable<boolean> {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const data = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
        if (data) {
          const list: Appointment[] = JSON.parse(data);
          const target = list.find(a => a.id === appointmentId);
          if (target) {
            target.status = 'CANCELLED';
            target.cancelReason = reason;
            localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(list));
            return of(true).pipe(delay(200));
          }
        }
      } catch (e) {
        console.error('Error cancelling appointment', e);
      }
    }
    return of(false).pipe(delay(150));
  }
}
