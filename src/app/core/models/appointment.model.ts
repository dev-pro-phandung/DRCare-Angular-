import { AttachedFile, BillingTarget } from './csyt.model';

export type AppointmentStatus = 'UPCOMING' | 'COMPLETED' | 'CANCELLED';

export interface PatientInfo {
  bookingFor: 'SELF' | 'RELATIVE';
  profileId?: string;
  fullName: string;
  phone: string;
  email?: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  cccd: string;
  insuranceCard?: string;
  address?: string;
  symptoms: string;
}

export interface Appointment {
  id: string;
  appointmentCode: string;          // Ví dụ "DRC-8899"
  billingTarget: BillingTarget;     // BHYT | Viện phí | Dịch vụ
  provinceName: string;
  hospital: string;                 // Cơ sở y tế
  hospitalAddress: string;
  examServiceName: string;          // Dịch vụ khám
  clinicRoomName: string;           // Phòng khám
  doctorId?: string;
  doctorName?: string;
  doctorTitle?: string;
  doctorAvatar?: string;
  specialtyName?: string;
  slotId?: string;
  date: string;                     // 10/11/2026 hoặc YYYY-MM-DD
  timeRange: string;                // "08:30 - 09:00"
  session: 'MORNING' | 'AFTERNOON';
  patient: PatientInfo;
  consultationFee: number;
  status: AppointmentStatus;
  cancelReason?: string;
  attachedFiles?: AttachedFile[];
  qrCodeData: string;
  createdAt: string;
}
