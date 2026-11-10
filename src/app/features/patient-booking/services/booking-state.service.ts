import { Injectable, signal } from '@angular/core';
import { BillingTarget, MedicalFacility, ExamService, ClinicRoom, PatientProfileOption, AttachedFile } from '../../../core/models/csyt.model';
import { Doctor } from '../../../core/models/doctor.model';
import { Appointment } from '../../../core/models/appointment.model';

export type VNPTBookingStep = 1 | 2 | 3;

export interface VNPTBookingFormData {
  selectedProfileId: string;
  patientProfile: PatientProfileOption | null;
  billingTarget: BillingTarget;
  provinceId: string;
  provinceName: string;
  facilityId: string;
  facility: MedicalFacility | null;
  examServiceId: string;
  examService: ExamService | null;
  clinicRoomId: string;
  clinicRoom: ClinicRoom | null;
  doctorId: string;
  doctor: Doctor | null;
  examDate: string;           // "10/11/2026"
  examTime: string;           // "08:30 - 09:00"
  insuranceCard: string;
  symptoms: string;
  attachedFiles: AttachedFile[];
}

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {
  readonly currentStep = signal<VNPTBookingStep>(1);

  // Dữ liệu đặt khám theo form chuẩn VNPT DrCare
  readonly formData = signal<VNPTBookingFormData>({
    selectedProfileId: 'prof-01',
    patientProfile: null,
    billingTarget: 'HOSPITAL_FEE', // Mặc định Viện phí
    provinceId: 'p-hn',
    provinceName: 'Hà Nội',
    facilityId: 'fac-01',
    facility: null,
    examServiceId: 'srv-01',
    examService: null,
    clinicRoomId: 'room-102',
    clinicRoom: null,
    doctorId: 'doc-01',
    doctor: null,
    examDate: '10/11/2026',
    examTime: '08:30 - 09:00',
    insuranceCard: '',
    symptoms: '',
    attachedFiles: []
  });

  readonly confirmedAppointment = signal<Appointment | null>(null);

  updateFormData(patch: Partial<VNPTBookingFormData>): void {
    this.formData.update(current => ({ ...current, ...patch }));
  }

  setStep(step: VNPTBookingStep): void {
    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setConfirmedAppointment(appointment: Appointment): void {
    this.confirmedAppointment.set(appointment);
    this.setStep(3);
  }

  reset(): void {
    this.currentStep.set(1);
    this.confirmedAppointment.set(null);
  }
}
