export type BillingTarget = 'BHYT' | 'HOSPITAL_FEE' | 'SERVICE';

export interface Province {
  id: string;
  name: string;
}

export interface MedicalFacility {
  id: string;
  provinceId: string;
  name: string;
  address: string;
}

export interface ExamService {
  id: string;
  name: string;
  fee: number;
}

export interface ClinicRoom {
  id: string;
  facilityId: string;
  name: string;
  specialtyName: string;
}

export interface AttachedFile {
  id: string;
  name: string;
  sizeStr: string;
  type: string;
}

export interface PatientProfileOption {
  id: string;
  fullName: string;
  label: string;          // "PHAN TIẾN DŨNG (Tôi)"
  phone: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  cccd: string;
  insuranceCard?: string;
}

